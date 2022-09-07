import React from "react";
import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
};

const Layout: React.FC = ({ children }) => (
    <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
    >
        {children}
    </motion.main>
);

export default Layout;
