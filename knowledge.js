```javascript
/* =========================================================
   ZYNTRA KNOWLEDGE BASE
   Free local school knowledge
   No API key required
   ========================================================= */

const ZYNTRA_KNOWLEDGE = {

    /* ================= MATHEMATICS ================= */

    mathematics: [

        {
            keywords: ["algebra", "what is algebra"],
            answer: `
            <strong>🧮 Algebra</strong><br><br>

            Algebra is a branch of mathematics that uses
            letters and symbols to represent numbers.

            <br><br>

            Example:<br>
            <strong>2x + 4 = 10</strong>

            <br><br>

            Subtract 4 from both sides:<br>
            2x = 6

            <br><br>

            Divide by 2:<br>
            <strong>x = 3</strong>
            `
        },

        {
            keywords: ["quadratic equation", "quadratic equations"],
            answer: `
            <strong>📐 Quadratic Equation</strong><br><br>

            A quadratic equation is usually written as:

            <br><br>

            <strong>ax² + bx + c = 0</strong>

            <br><br>

            where <strong>a ≠ 0</strong>.

            <br><br>

            One method of solving a quadratic equation
            is factorisation.

            <br><br>

            Example:<br>
            x² + 5x + 6 = 0

            <br><br>

            Factorise:<br>
            (x + 2)(x + 3) = 0

            <br><br>

            Therefore:<br>
            <strong>x = -2 or x = -3</strong>
            `
        },

        {
            keywords: ["trigonometry", "sine", "cosine", "tangent"],
            answer: `
            <strong>📐 Trigonometry</strong><br><br>

            Trigonometry studies the relationship between
            angles and sides of triangles.

            <br><br>

            The three common ratios are:

            <br><br>

            <strong>sin θ = Opposite / Hypotenuse</strong><br><br>

            <strong>cos θ = Adjacent / Hypotenuse</strong><br><br>

            <strong>tan θ = Opposite / Adjacent</strong>

            <br><br>

            A useful memory aid is:

            <br>

            <strong>SOH — CAH — TOA</strong>
            `
        },

        {
            keywords: ["pythagoras", "pythagoras theorem", "right angled triangle"],
            answer: `
            <strong>📐 Pythagoras' Theorem</strong><br><br>

            For a right-angled triangle:

            <br><br>

            <strong>a² + b² = c²</strong>

            <br><br>

            where <strong>c</strong> is the hypotenuse.

            <br><br>

            Example:<br>

            If a = 3 and b = 4:

            <br><br>

            c² = 3² + 4²<br>
            c² = 9 + 16<br>
            c² = 25

            <br><br>

            Therefore:

            <strong>c = 5</strong>
            `
        },

        {
            keywords: ["percentage", "percentages"],
            answer: `
            <strong>📊 Percentage</strong><br><br>

            Percentage means "out of 100".

            <br><br>

            Formula:

            <br>

            <strong>
            Percentage = (Part / Whole) × 100
            </strong>

            <br><br>

            Example:

            20 out of 50:

            <br><br>

            (20 / 50) × 100 = <strong>40%</strong>
            `
        },

        {
            keywords: ["mean", "average"],
            answer: `
            <strong>📊 Mean (Average)</strong><br><br>

            To find the mean:

            <br><br>

            <strong>
            Mean = Sum of values / Number of values
            </strong>

            <br><br>

            Example:

            4, 6, 8

            <br><br>

            Mean = (4 + 6 + 8) / 3

            <br>

            Mean = 18 / 3

            <br>

            <strong>Mean = 6</strong>
            `
        }

    ],


    /* ================= CHEMISTRY ================= */

    chemistry: [

        {
            keywords: ["atom", "atomic structure", "what is an atom"],
            answer: `
            <strong>⚛️ Atom</strong><br><br>

            An atom is the smallest particle of an element
            that retains the chemical properties of that element.

            <br><br>

            The three main subatomic particles are:

            <br><br>

            🔴 <strong>Proton</strong> — positive charge<br>
            ⚪ <strong>Neutron</strong> — no charge<br>
            🔵 <strong>Electron</strong> — negative charge

            <br><br>

            Protons and neutrons are found in the nucleus,
            while electrons occupy regions around the nucleus.
            `
        },

        {
            keywords: ["element", "elements"],
            answer: `
            <strong>🧪 Element</strong><br><br>

            An element is a pure substance made up of
            only one type of atom.

            <br><br>

            Examples include:

            <br><br>

            • Hydrogen — H<br>
            • Oxygen — O<br>
            • Carbon — C<br>
            • Sodium — Na<br>
            • Iron — Fe
            `
        },

        {
            keywords: ["compound", "compounds"],
            answer: `
            <strong>🧪 Compound</strong><br><br>

            A compound is a substance formed when two or
            more different elements chemically combine.

            <br><br>

            Examples:

            <br><br>

            Water — <strong>H₂O</strong><br>
            Carbon dioxide — <strong>CO₂</strong><br>
            Sodium chloride — <strong>NaCl</strong>
            `
        },

        {
            keywords: ["chemical reaction", "chemical reactions"],
            answer: `
            <strong>⚗️ Chemical Reaction</strong><br><br>

            A chemical reaction is a process in which
            substances change to form new substances.

            <br><br>

            The starting substances are called
            <strong>reactants</strong>.

            <br><br>

            The substances formed are called
            <strong>products</strong>.

            <br><br>

            General form:

            <br>

            <strong>Reactants → Products</strong>
            `
        },

        {
            keywords: ["acid", "acids"],
            answer: `
            <strong>🧪 Acids</strong><br><br>

            An acid is a substance that produces hydrogen
            ions in aqueous solution.

            <br><br>

            Common properties of acids:

            <br><br>

            • pH below 7<br>
            • Turn blue litmus paper red<br>
            • React with some metals<br>
            • React with bases

            <br><br>

            Examples include:

            <br>

            HCl, H₂SO₄ and HNO₃.
            `
        },

        {
            keywords: ["base", "bases", "alkali", "alkalis"],
            answer: `
            <strong>🧪 Bases and Alkalis</strong><br><br>

            A base is a substance that can neutralise an acid.

            <br><br>

            An alkali is a base that dissolves in water.

            <br><br>

            Examples of alkalis:

            <br>

            NaOH<br>
            KOH

            <br><br>

            Alkalis generally have a pH above 7 and turn
            red litmus paper blue.
            `
        },

        {
            keywords: ["neutralisation", "neutralization"],
            answer: `
            <strong>⚗️ Neutralisation</strong><br><br>

            Neutralisation is a reaction between an acid
            and a base.

            <br><br>

            The general equation is:

            <br><br>

            <strong>
            Acid + Base → Salt + Water
            </strong>

            <br><br>

            Example:

            <br>

            HCl + NaOH → NaCl + H₂O
            `
        },

        {
            keywords: ["water", "h2o"],
            answer: `
            <strong>💧 Water</strong><br><br>

            Water is a compound made from hydrogen and oxygen.

            <br><br>

            Its chemical formula is:

            <br>

            <strong>H₂O</strong>

            <br><br>

            This means each water molecule contains
            two hydrogen atoms and one oxygen atom.
            `
        }

    ],


    /* ================= PHYSICS ================= */

    physics: [

        {
            keywords: ["force", "forces"],
            answer: `
            <strong>⚡ Force</strong><br><br>

            A force is a push or pull that can change
            the motion or shape of an object.

            <br><br>

            The SI unit of force is the
            <strong>Newton (N)</strong>.

            <br><br>

            Newton's Second Law:

            <br>

            <strong>F = ma</strong>

            <br><br>

            Force = mass × acceleration.
            `
        },

        {
            keywords: ["pressure", "pressure in solids"],
            answer: `
            <strong>⚡ Pressure</strong><br><br>

            Pressure is the force acting normally per unit area.

            <br><br>

            Formula:

            <br>

            <strong>P = F / A</strong>

            <br><br>

            P = Pressure<br>
            F = Force<br>
            A = Area

            <br><br>

            The SI unit of pressure is the
            <strong>Pascal (Pa)</strong>.
            `
        },

        {
            keywords: ["density"],
            answer: `
            <strong>⚖️ Density</strong><br><br>

            Density is the mass per unit volume of a substance.

            <br><br>

            Formula:

            <br>

            <strong>Density = Mass / Volume</strong>

            <br><br>

            SI unit:

            <br>

            <strong>kg/m³</strong>
            `
        },

        {
            keywords: ["speed"],
            answer: `
            <strong>🏃 Speed</strong><br><br>

            Speed is the distance travelled per unit time.

            <br><br>

            Formula:

            <br>

            <strong>Speed = Distance / Time</strong>

            <br><br>

            SI unit:

            <strong>m/s</strong>
            `
        },

        {
            keywords: ["acceleration"],
            answer: `
            <strong>🚀 Acceleration</strong><br><br>

            Acceleration is the rate of change of velocity
            with time.

            <br><br>

            Formula:

            <br>

            <strong>
            a = (v - u) / t
            </strong>

            <br><br>

            u = initial velocity<br>
            v = final velocity<br>
            t = time
            `
        },

        {
            keywords: ["newton", "newton laws", "laws of motion"],
            answer: `
            <strong>⚡ Newton's Laws of Motion</strong><br><br>

            <strong>First Law:</strong><br>
            An object remains at rest or moves at constant
            velocity unless acted upon by an external force.

            <br><br>

            <strong>Second Law:</strong><br>
            Force is related to mass and acceleration:

            <br>

            <strong>F = ma</strong>

            <br><br>

            <strong>Third Law:</strong><br>
            When one object exerts a force on another,
            the second object exerts an equal and opposite
            force on the first.
            `
        },

        {
            keywords: ["work", "work done"],
            answer: `
            <strong>🔧 Work Done</strong><br><br>

            Work is done when a force causes an object
            to move through a distance in the direction
            of the force.

            <br><br>

            Formula:

            <br>

            <strong>W = F × d</strong>

            <br><br>

            W = work done<br>
            F = force<br>
            d = distance

            <br><br>

            SI unit: <strong>Joule (J)</strong>
            `
        },

        {
            keywords: ["energy", "forms of energy"],
            answer: `
            <strong>🔋 Energy</strong><br><br>

            Energy is the ability to do work.

            <br><br>

            Common forms include:

            <br><br>

            • Kinetic energy<br>
            • Potential energy<br>
            • Chemical energy<br>
            • Electrical energy<br>
            • Light energy<br>
            • Thermal energy

            <br><br>

            The SI unit of energy is the
            <strong>Joule (J)</strong>.
            `
        }

    ]

};


/* =========================================================
   SEARCH THE KNOWLEDGE BASE
   ========================================================= */

function searchZyntraKnowledge(question) {

    let text = question.toLowerCase();

    let subjects = Object.keys(ZYNTRA_KNOWLEDGE);

    for (let subject of subjects) {

        let topics = ZYNTRA_KNOWLEDGE[subject];

        for (let topic of topics) {

            for (let keyword of topic.keywords) {

                if (text.includes(keyword)) {

                    return topic.answer;

                }

            }

        }

    }

    return null;
}

