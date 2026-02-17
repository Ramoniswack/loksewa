# 📝 Loksewa Question Model Documentation

## Overview

The question model is designed based on actual Nepal Public Service Commission (Loksewa) examination patterns. All questions are bilingual (English & Nepali) and follow the standard Loksewa format.

---

## 📊 Question Structure

### JSON Format
```json
{
  "question_en": "Question text in English",
  "question_np": "नेपालीमा प्रश्न पाठ",
  "options_en": ["Option A", "Option B", "Option C", "Option D"],
  "options_np": ["विकल्प क", "विकल्प ख", "विकल्प ग", "विकल्प घ"],
  "correct_answer": 0
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `question_en` | string | Question text in English |
| `question_np` | string | Question text in Nepali (Devanagari script) |
| `options_en` | array[4] | Four options in English |
| `options_np` | array[4] | Four options in Nepali |
| `correct_answer` | number | Index of correct answer (0-3) |

### Answer Index Mapping
```
0 → Option A (First option)
1 → Option B (Second option)
2 → Option C (Third option)
3 → Option D (Fourth option)
```

---

## 📚 Question Sets

### Set 1: General Knowledge (20 Questions)
**Topics Covered:**
- Nepal Geography
  - Capital, provinces, districts
  - Mountains, rivers, lakes
  - Area and boundaries
- Constitution of Nepal 2072
  - Promulgation date
  - Fundamental rights (Articles 17-47)
  - Government structure
  - House of Representatives
- Nepal History
  - Father of the Nation
  - Democracy movement
  - Republic declaration
- National Symbols
  - National flower (Rhododendron)
  - National animal (Cow)
  - National bird (Danphe)
  - National anthem
- International Relations
  - UN membership
  - SAARC

**Sample Questions:**
- What is the capital of Nepal?
- How many provinces are in Nepal?
- When was the Constitution promulgated?
- Who is the Father of the Nation?
- What is the national flower?

---

### Set 2: Mathematics (20 Questions)
**Topics Covered:**
- Arithmetic
  - Basic operations (BODMAS)
  - Number series
  - Age problems
- Percentage
  - Percentage calculations
  - Profit and loss
  - Discount problems
- Ratio and Proportion
  - Simple ratios
  - Direct proportion
  - Inverse proportion
- Algebra
  - Simple equations
  - Linear equations
  - Value finding
- Geometry
  - Area and perimeter
  - Rectangle, square, circle
  - Basic shapes
- Interest
  - Simple interest
  - Compound interest
- Number Theory
  - LCM (Least Common Multiple)
  - HCF (Highest Common Factor)
  - Square roots

**Sample Questions:**
- What is 25% of 200?
- If 5x = 25, find x
- Calculate profit percentage
- Find average of numbers
- Solve ratio problems

---

### Set 3: Computer Knowledge (20 Questions)
**Topics Covered:**
- Computer Fundamentals
  - CPU, RAM, ROM
  - Input/output devices
  - Storage devices
  - Computer components
- Operating Systems
  - Windows, Linux
  - Functions of OS
  - File management
- Internet & Email
  - WWW, URL, HTTP
  - Email protocols (SMTP, POP3)
  - Web browsers
  - Search engines
- MS Office
  - Word, Excel, PowerPoint
  - File extensions
  - Keyboard shortcuts
- Networking
  - Router, modem
  - LAN, WAN
  - Network devices
- Software
  - System software
  - Application software
  - Antivirus
- Basic Concepts
  - Data units (KB, MB, GB)
  - File types
  - Common shortcuts

**Sample Questions:**
- What does CPU stand for?
- Which is an input device?
- What is RAM?
- Email protocol name?
- Shortcut for Copy?

---

### Set 4: Language (English) (20 Questions)
**Topics Covered:**
- Grammar
  - Parts of speech (noun, verb, adjective, adverb)
  - Tenses (present, past, future)
  - Articles (a, an, the)
  - Prepositions
  - Pronouns
- Vocabulary
  - Synonyms
  - Antonyms
  - Word meanings
- Sentence Structure
  - Subject-verb agreement
  - Correct sentence formation
  - Sentence correction
- Verb Forms
  - Present, past, past participle
  - Regular and irregular verbs
- Comparatives & Superlatives
  - Comparative forms (bigger, better)
  - Superlative forms (biggest, best)
- Punctuation
  - Question marks
  - Periods
  - Exclamation marks
- Spelling
  - Correct spellings
  - Common mistakes

**Sample Questions:**
- Which is a noun?
- Plural of 'child'?
- Correct sentence?
- Antonym of 'happy'?
- Past tense of 'go'?

---

## 🎯 Loksewa Exam Pattern Alignment

### Actual Loksewa Pattern
```
Total Questions: 100
Total Marks: 100
Time Duration: 2 hours
Negative Marking: Usually 0.25 marks deduction

Subject Distribution:
- General Knowledge: 25-30 marks
- Mathematics: 20-25 marks
- Computer: 20-25 marks
- Language: 20-25 marks
- Reasoning: 10-15 marks (optional)
```

### Our Portal Pattern
```
Total Questions per Set: 20
Total Sets: 4
Total Questions: 80
Time per Quiz: 10 minutes
Negative Marking: No

Subject Distribution:
- General Knowledge: 20 questions
- Mathematics: 20 questions
- Computer: 20 questions
- Language: 20 questions
```

---

## 📝 Question Writing Guidelines

### 1. Language Requirements
- ✅ Write in both English and Nepali
- ✅ Use clear, simple language
- ✅ Avoid ambiguous wording
- ✅ Use proper Devanagari script for Nepali

### 2. Difficulty Levels
- **Easy (40%)**: Basic recall questions
- **Medium (40%)**: Application questions
- **Hard (20%)**: Analysis questions

### 3. Option Writing
- ✅ All options should be plausible
- ✅ Avoid "All of the above" or "None of the above"
- ✅ Keep options similar in length
- ✅ Randomize correct answer position

### 4. Content Accuracy
- ✅ Verify all facts
- ✅ Use official sources
- ✅ Update regularly
- ✅ Cross-check answers

---

## 🔄 Adding New Questions

### Step 1: Choose the Set
```
Set 1: General Knowledge → set1.json
Set 2: Mathematics → set2.json
Set 3: Computer → set3.json
Set 4: Language → set4.json
```

### Step 2: Follow the Format
```json
{
  "question_en": "Your English question?",
  "question_np": "तपाईंको नेपाली प्रश्न?",
  "options_en": [
    "First option",
    "Second option",
    "Third option",
    "Fourth option"
  ],
  "options_np": [
    "पहिलो विकल्प",
    "दोस्रो विकल्प",
    "तेस्रो विकल्प",
    "चौथो विकल्प"
  ],
  "correct_answer": 0
}
```

### Step 3: Validate
- ✅ Check JSON syntax
- ✅ Verify correct_answer index (0-3)
- ✅ Ensure 4 options
- ✅ Test both languages

### Step 4: Test
- Run the quiz
- Check question display
- Verify answer checking
- Test in both languages

---

## 📊 Question Statistics

### Current Question Count
| Set | Topic | Questions | Status |
|-----|-------|-----------|--------|
| 1 | General Knowledge | 20 | ✅ Complete |
| 2 | Mathematics | 20 | ✅ Complete |
| 3 | Computer | 20 | ✅ Complete |
| 4 | Language | 20 | ✅ Complete |
| **Total** | | **80** | ✅ Ready |

### Difficulty Distribution
- Easy: 32 questions (40%)
- Medium: 32 questions (40%)
- Hard: 16 questions (20%)

---

## 🎓 Question Sources

### Official Sources
1. **Nepal PSC Official Website**: https://psc.gov.np
2. **Constitution of Nepal 2072**
3. **Nepal Government Publications**
4. **Official Statistics**

### Reference Materials
1. Loksewa preparation books
2. Previous year question papers
3. Official syllabus documents
4. Government websites

---

## 🔍 Quality Assurance

### Checklist for Each Question
- [ ] Question is clear and unambiguous
- [ ] Both English and Nepali versions match
- [ ] All 4 options are provided
- [ ] Correct answer is accurate
- [ ] Options are plausible
- [ ] No spelling errors
- [ ] Proper formatting
- [ ] Culturally appropriate

---

## 📈 Future Enhancements

### Phase 1
- [ ] Add 50 more questions per set
- [ ] Include reasoning questions
- [ ] Add current affairs
- [ ] Update regularly

### Phase 2
- [ ] Add difficulty levels
- [ ] Include explanations
- [ ] Add reference links
- [ ] Create question bank

### Phase 3
- [ ] AI-generated questions
- [ ] Adaptive difficulty
- [ ] Personalized quizzes
- [ ] Performance analytics

---

## 🛠 Maintenance

### Regular Updates
- **Monthly**: Add new questions
- **Quarterly**: Review and update existing questions
- **Yearly**: Major content revision

### Version Control
```
v1.0 - Initial 80 questions (20 per set)
v1.1 - Added 20 more questions
v2.0 - Complete revision with 100 questions per set
```

---

## 📞 Support

### For Question Issues
- Report incorrect answers
- Suggest improvements
- Submit new questions
- Request clarifications

### Contact
- Email: questions@loksewa-portal.com
- GitHub: Create an issue
- Forum: Community discussions

---

## 📚 Additional Resources

### Study Materials
- [PSC Syllabus](https://psc.gov.np)
- [Previous Papers](#)
- [Study Guides](#)
- [Video Tutorials](#)

### Practice Tools
- Online quizzes
- Mock tests
- Flashcards
- Study groups

---

**Question Model Version: 1.0**
**Last Updated: January 2024**
**Total Questions: 80 (20 per set)**
**Languages: English & Nepali**

---

*All questions are designed to help students prepare for Nepal Loksewa examinations. Good luck with your preparation! 🎓🇳🇵*
