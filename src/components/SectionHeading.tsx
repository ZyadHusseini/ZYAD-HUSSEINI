import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}

/** Section title — eyebrow label on top, last word of the title in gradient. */
export default function SectionHeading({ eyebrow, title, align = "center" }: Props) {
  const words = title.split(" ");
  const last = words.pop();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-4xl font-bold text-white md:text-5xl">
        {words.join(" ")}{words.length > 0 ? " " : ""}
        <span className="gradient-text">{last}</span>
      </h2>
      <div
        className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden
      />
    </motion.div>
  );
}
