# Claude Prompt: Research Literature Search

> Use this prompt to have Claude search for relevant papers and create literature notes

---

## Prompt Template

```
I'm working on [[project-name]] and need to find relevant literature on [TOPIC].

Please:

1. Search for recent papers (2020-present) on [TOPIC]
2. For each paper found:
   - Create a literature note using the template: `30-RESOURCES/templates/paper-note.md`
   - Filename format: `FirstAuthorYYYY-short-descriptive-title`
   - Extract key information:
     * Authors and publication details
     * Core contribution (1 sentence)
     * Key ideas (3-5 bullet points)
     * Main results/theorems
     * How it relates to my project [[project-name]]
   - Set relevance scores for research/teaching/packages
   - Tag appropriately (#mediation, #sensitivity-analysis, etc.)

3. Create a summary table showing:
   | Paper | Year | Relevance | Key Contribution |
   |-------|------|-----------|------------------|

Focus areas:
- [SUBTOPIC 1]
- [SUBTOPIC 2]
- [SUBTOPIC 3]

Keywords: [keyword1, keyword2, keyword3]

Priority: Focus on highly-cited methodological papers and recent advances.
```

---

## Example Usage

**Scenario**: Looking for papers on doubly robust mediation estimators

```
I'm working on [[semiparametric-mediation-manuscript]] and need to find relevant
literature on doubly robust estimation for mediation analysis.

Please:

1. Search for recent papers (2018-present) on doubly robust mediation estimators
2. For each paper found, create a literature note with filename format:
   `FirstAuthorYYYY-short-title`
3. Extract:
   - Full citation
   - Core contribution (what's new?)
   - Key theorems/results
   - Estimator formulas
   - How it compares to standard approaches
4. Set relevance: research (high), teaching (medium), packages (medium)
5. Tag with: #mediation #doubly-robust #semiparametric

Focus areas:
- Influence function derivations
- Efficiency bounds
- Finite-sample performance
- R package implementations

Keywords: doubly robust, mediation, AIPW, targeted learning, semiparametric efficiency

Priority: Methodological papers in JASA, Biometrika, Biostatistics with > 20 citations
```

---

## Variations

### Quick Survey

```
Give me a quick overview of the last 5 years of research on [TOPIC].
Create brief notes for the 5 most influential papers.
```

### Deep Dive on One Paper

```
I found this paper: [CITATION or DOI]

Please create a detailed literature note with:
- Complete theorem statements
- All key equations
- Connections to papers it cites
- Papers that cite this one
- Implementation notes
```

### Find Related Papers

```
I really like this paper: [[existing-literature-note]]

Find 5-10 papers that:
- Build on this work
- Use similar methods
- Address related problems
- Would be good to cite in my manuscript
```

---

## After Claude Responds

1. Review generated notes in `30-RESOURCES/literature/`
2. Verify citations and DOIs
3. Download PDFs to `00-INBOX/literature-inbox/`
4. Add personal notes/questions
5. Link to relevant projects
6. Update relevance scores if needed

---

## Tips

**Be Specific**:
- Include exact keywords and phrases
- Mention specific methods/estimators
- Name key authors if known

**Set Constraints**:
- Year range (e.g., 2015-present)
- Journal tier (top methodological journals)
- Citation threshold (> 10 citations)

**Request Summaries**:
- Ask for comparison tables
- Request categorization (theoretical vs. applied)
- Want connections between papers highlighted

**Integrate with Projects**:
- Always link to specific project: `[[project-name]]`
- Request relevance scoring
- Ask how findings relate to your work

---

**Related**:
- [[30-RESOURCES/templates/paper-note|Literature Note Template]]
- [[30-RESOURCES/literature/_literature-index|Literature Index]]
