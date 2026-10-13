
const ZYNTRA_LESSONS = {
    chemistry: {
        "atomic-structure": {
            title: "Atomic Structure",
            description: "Learn about atoms, subatomic particles and electronic arrangement.",
            content: `
<h2>Atomic Structure</h2>
<p>An atom is the smallest unit of an element that retains its chemical properties.</p>
<h3>Subatomic particles</h3>
<ul>
<li><strong>Protons:</strong> Positively charged particles found in the nucleus.</li>
<li><strong>Neutrons:</strong> Particles with no electrical charge, found in the nucleus.</li>
<li><strong>Electrons:</strong> Negatively charged particles found around the nucleus.</li>
</ul>
<h3>Atomic number</h3>
<p>The atomic number is the number of protons in an atom.</p>
<h3>Mass number</h3>
<p>Mass number = number of protons + number of neutrons.</p>
<h3>Electronic arrangement</h3>
<p>Electrons occupy energy levels around the nucleus. Sodium has the electronic arrangement 2.8.1.</p>`,
            question: "Which subatomic particle has a negative charge?",
            options: ["Proton", "Neutron", "Electron", "Nucleus"],
            answer: 2
        },

        "chemical-reactions": {
            title: "Chemical Reactions",
            description: "Understand reactants, products and chemical equations.",
            content: `
<h2>Chemical Reactions</h2>
<p>A chemical reaction is a process in which substances change into new substances.</p>
<h3>Reactants and products</h3>
<p>Reactants are the starting substances. Products are the substances formed.</p>
<p><strong>Example:</strong> Magnesium + Oxygen → Magnesium oxide.</p>
<h3>Balanced equations</h3>
<p>A chemical equation must have the same number of atoms of each element on both sides.</p>
<p><strong>2H₂ + O₂ → 2H₂O</strong></p>
<h3>Types of reactions</h3>
<ul>
<li>Combination reactions</li>
<li>Decomposition reactions</li>
<li>Displacement reactions</li>
<li>Neutralisation reactions</li>
</ul>`,
            question: "What are the starting substances in a chemical reaction called?",
            options: ["Products", "Reactants", "Catalysts", "Solvents"],
            answer: 1
        },

        "acids-and-bases": {
            title: "Acids and Bases",
            description: "Learn about acids, bases, indicators, pH and neutralisation.",
            content: `
<h2>Acids and Bases</h2>
<p>Acids and bases are important groups of chemical substances with different properties.</p>
<h3>Properties of acids</h3>
<ul>
<li>Acids have a pH below 7 in aqueous solution.</li>
<li>They turn blue litmus paper red.</li>
<li>They react with some metals to produce hydrogen gas.</li>
<li>They react with bases to form salt and water.</li>
</ul>
<h3>Properties of bases</h3>
<ul>
<li>Alkaline solutions have a pH above 7.</li>
<li>Alkalis turn red litmus paper blue.</li>
</ul>
<h3>Neutralisation</h3>
<p>Acid + Base → Salt + Water.</p>
<p>Hydrochloric acid + Sodium hydroxide → Sodium chloride + Water.</p>
<h3>Indicators</h3>
<p>Litmus, methyl orange and phenolphthalein help identify acidic and alkaline solutions.</p>`,
            question: "What colour does blue litmus paper turn in an acidic solution?",
            options: ["Blue", "Green", "Red", "Purple"],
            answer: 2
        },

        water: {
            title: "Water",
            description: "Study the properties, treatment and importance of water.",
            content: `
<h2>Water</h2>
<p>Water is a compound made of hydrogen and oxygen. Its chemical formula is H₂O.</p>
<h3>Properties of water</h3>
<ul>
<li>Pure water is colourless, odourless and tasteless.</li>
<li>Pure water freezes at 0°C under standard atmospheric pressure.</li>
<li>Pure water boils at 100°C under standard atmospheric pressure.</li>
<li>Water is a good solvent for many substances.</li>
</ul>
<h3>Water treatment</h3>
<p>Water for public supply may be treated through sedimentation, filtration and disinfection.</p>
<h3>Tests for water</h3>
<p>Anhydrous copper(II) sulfate changes from white to blue in the presence of water.</p>
<p>Cobalt(II) chloride paper changes from blue to pink in the presence of water.</p>
<h3>Importance of water</h3>
<p>Water is needed for domestic use, agriculture, industry and biological processes.</p>`,
            question: "What is the chemical formula of water?",
            options: ["CO₂", "H₂O", "O₂", "NaCl"],
            answer: 1
        },

        "organic-chemistry": {
            title: "Organic Chemistry",
            description: "Explore carbon compounds, hydrocarbons and their reactions.",
            content: `
<h2>Organic Chemistry</h2>
<p>Organic chemistry studies carbon compounds, especially hydrocarbons and their derivatives.</p>
<h3>Hydrocarbons</h3>
<p>Hydrocarbons contain only carbon and hydrogen.</p>
<h3>Alkanes</h3>
<p>Alkanes are saturated hydrocarbons. Their general formula is CₙH₂ₙ₊₂.</p>
<p>Examples include methane (CH₄) and ethane (C₂H₆).</p>
<h3>Alkenes</h3>
<p>Alkenes contain at least one carbon-carbon double bond. Simple open-chain alkenes with one double bond have the general formula CₙH₂ₙ.</p>
<p>Ethene (C₂H₄) is an example of an alkene.</p>
<h3>Combustion</h3>
<p>Complete combustion of a hydrocarbon in sufficient oxygen produces carbon dioxide and water.</p>
<h3>Uses</h3>
<p>Organic compounds are used as fuels and in making plastics, medicines and other useful materials.</p>`,
            question: "Which elements are present in hydrocarbons?",
            options: [
                "Hydrogen and oxygen",
                "Carbon and hydrogen",
                "Carbon and nitrogen",
                "Sodium and chlorine"
            ],
            answer: 1
        },

        electrochemistry: {
            title: "Electrochemistry",
            description: "Learn about electrolysis, electrolytes and chemical cells.",
            content: `
<h2>Electrochemistry</h2>
<p>Electrochemistry studies the relationship between electrical energy and chemical changes.</p>
<h3>Electrolysis</h3>
<p>Electrolysis is the decomposition of an ionic substance using electricity when molten or in aqueous solution.</p>
<h3>Electrolytes</h3>
<p>Electrolytes conduct electricity when molten or dissolved in water because their ions can move.</p>
<h3>Electrodes</h3>
<ul>
<li><strong>Anode:</strong> The electrode where oxidation occurs.</li>
<li><strong>Cathode:</strong> The electrode where reduction occurs.</li>
</ul>
<h3>Movement of ions</h3>
<p>Positive ions (cations) move towards the cathode. Negative ions (anions) move towards the anode.</p>
<h3>Applications</h3>
<ul>
<li>Electroplating objects</li>
<li>Extraction of reactive metals</li>
<li>Purification of copper</li>
<li>Manufacture of certain chemicals</li>
</ul>`,
            question: "Towards which electrode do positive ions move during electrolysis?",
            options: ["Anode", "Cathode", "Both electrodes equally", "Neither electrode"],
            answer: 1
        }
    }
};

window.ZYNTRA_LESSONS = ZYNTRA_LESSONS;
