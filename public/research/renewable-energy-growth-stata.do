rename GDPPerCapitaGrowthannual GDPCAP

rename GrossCapitalFormation GCF

rename SchoolenrollmentSecondary SE

rename Populationgrowth PG

rename Tradegdp TRADE

rename RenewableEnergyConsumption REC


*for the heat map to display multi collinearity AND MAKE SURE NO VALUE IS BIGGER THAN 0.5 (THERE IS ALOT)

correlate REC GCF SE PG TRADE
return list
matrix corrmatrix = r(C)
heatplot corrmatrix, values

*AS REQUIRED FOR THE FIRST STEP I WILL DO THE DESCRIPTIVE STATISTICS 

 sum GDPCAP GCF SE PG TRADE REC


*I will do a horizontal bar chart to compare between countries and their gdp per capita

graph hbar GDPCAP, over(Country)



*DRAWING THE GRAPH REPRESENTING RELATIONSHIP BETWEEN REC AND GDPCAP

graph twoway (scatter GDPCAP REC) (lfit GDPCAP REC)



*HISTOGEAM TO DETERMINE SKEWNESS AND FREQUENCY

histogram GDPCAP, frequency


 *THEN I WILL DO REGRESSION FOR THE MODEL
 
 asdoc regress GDPCAP REC GCF SE PG TRADE


* NOW I PERFORM WHITE TEST ROBUST REGRESS

regress GDPCAP REC GCF SE PG TRADE

imtest, white

regress GDPCAP REC GCF SE PG TRADE, robust




*THE NEXT LINES OF CODE WILL BE FOR THE NEW REVISED MODEL (if you wish to apply the codes please use worksheet "modified" from econometrics data.xlsx)




rename SchoolenrollmentTertiaryg SET


rename logpg LOGPG


*CHECKING FOR CORRELATION AFTER MODIFYING SOME VARIABLES

correlate REC GCF SET LOGPG TRADE
return list
matrix corrmatrix = r(C)
heatplot corrmatrix, values



* I WILL KNOW CREATE THE MLE PROGRAM WITH ITERATIONS, REGRESSIONS, AND GRAPHS FOR THE REVISED MODEL

capture program drop prog3
program define prog3
args lnf xb sigma
quietly replace `lnf' = ln( normalden ($ML_y, `xb', `sigma'))
end


*I HAVE NOW BUILT THE PROGRAM TIME TO TEST THE NEW BETTER MODEL

ml model lf prog3 (xb: GDPCAP= REC GCF SET LOGPG TRADE) (sigma:)


*AFTER MAKING STATA USE MLE WE WILL MAXIMIZE THE MODEL

ml maximize

*NOW I WILL GRAPH THE MLE


ml graph


*This code estimates the impact of renewable energy, investment, education, population growth, and trade openness on GDP per capita across countries over time, controlling for year effects and clustering standard errors by country to ensure robust inference.


 asdoc regress GDPCAP REC GCF SET LOGPG TRADE i.Year, nocons vce(cluster Country)


*turning my COUNTRY VARIABLE from string to SOMETHING STATA CAN UNDERSTAND

encode Country, gen(country_id)
xtset country_id Year


gen LAGREC = L.REC
reg REC LAGREC GCF SET LOGPG TRADE
predict REC_hat, xb
reg GDPCAP REC_hat GCF SET LOGPG TRADE

ivregress 2sls GDPCAP (REC = LAGREC) GCF SET LOGPG TRADE, robust


* FOR IVREG 2 WE NEED TO INSTALL IT FIRST

ssc install ivreg2

* THEN AFTER INSTALLING IT WE DO THE COMMAND IT SELF
* sidenote: I had to install rankset first


ivreg2 GDPCAP (REC = LAGREC) GCF SET LOGPG TRADE, robust



*ADRESSING AUTO. CORRELATION
regress GDPCAP REC GCF SE PG TRADE

predict res, resid

generate t=_n

tsset t

wntestq res


*installing newey2

Ssc instal newey2, replace


*Use newey2 for adressing auto CORRELATION

newey2 GDPCAP REC GCF SE PG TRADE, lag (1)


*performing the hausmen test to know if I need re or fe
egen countrycode = group (Country)
xtset countrycode Year
xtreg GDPCAP REC, fe
est store fe
xtreg GDPCAP REC, re
est store re
hausman fe re

*note after doing the housemen test I will use the random effect

xtreg GDPCAP REC, re