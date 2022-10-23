import { useContext } from "react";
import { LevelContext } from "../context/LevelContext";

interface SectionProps {
    children: JSX.Element | JSX.Element[];
    isFancy?: boolean
}

export function Section({ children, isFancy}: SectionProps) {
    const level = useContext(LevelContext);
    return (
        <section className={
            'section ' +
            (isFancy ? 'fancy' : '')
        }>
        <LevelContext.Provider value={level + 1}>
        {children}
        </LevelContext.Provider>

      </section>
    );
  }