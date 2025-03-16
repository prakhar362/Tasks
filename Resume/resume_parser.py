import fitz   # PyMuPDF for PDFs
import docx
import re
import spacy
import json
import textstat  # For grammar and readability check

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text("text") for page in doc])
    return text

# Function to extract text from DOCX
def extract_text_from_docx(docx_path):
    doc = docx.Document(docx_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

# Extract name, email, phone, skills, experience, CGPA, and percentage
def parse_resume(text):
    doc = nlp(text)
    
    name = None
    email = None
    phone = None
    skills = []
    experience = 0
    cgpa = None
    percentage = None

    # Extract email
    email_match = re.search(r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+", text)
    if email_match:
        email = email_match.group()

    # Extract phone
    phone_match = re.search(r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", text)
    if phone_match:
        phone = phone_match.group()
    
    # Extract name using Named Entity Recognition (NER)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text
            name = re.sub(r'\+?\d[\d\s\-\(\)]{8,}', '', name).strip()
            break  # Take the first detected name

    # Extract skills (basic list matching approach)
    predefined_skills = {
        "Python", "JavaScript", "React", "Node.js", "Machine Learning",
        "SQL", "Django", "TensorFlow", "Keras", "Flask", "MongoDB",
        "Express.js", "Vue.js", "Angular", "Java", "C++", "AWS"
    }
    skills = list(set([token.text for token in doc if token.text in predefined_skills]))

    # Extract experience
    exp_match = re.search(r"(\d+)\+? years? experience", text, re.IGNORECASE)
    if exp_match:
        experience = int(exp_match.group(1))

    # Extract CGPA
    cgpa_match = re.search(r"CGPA.*?(\d+\.\d+)", text, re.IGNORECASE)
    if cgpa_match:
        cgpa = float(cgpa_match.group(1))
    
    # Extract Percentage
    percentage_match = re.search(r'(\d{2,3})\s?%', text)
    if percentage_match:
        percentage = int(percentage_match.group(1))

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "experience": experience,
        "cgpa": cgpa,
        "percentage": percentage
    }

# Check English grammar and readability
def check_grammar(text):
    readability_score = textstat.flesch_reading_ease(text)
    return round(readability_score, 2)  # Higher score = easier to read

# Analyze projects for Web Dev or AI relevance
def analyze_projects(text):
    web_dev_keywords = {"React", "Node.js", "Express.js", "MongoDB", "Vue.js", "Angular", "CSS", "HTML", "Bootstrap"}
    ai_keywords = {"Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "Computer Vision"}

    web_dev_mention = any(keyword in text for keyword in web_dev_keywords)
    ai_mention = any(keyword in text for keyword in ai_keywords)

    if web_dev_mention and ai_mention:
        return "Both Web Development & AI"
    elif web_dev_mention:
        return "Web Development"
    elif ai_mention:
        return "Artificial Intelligence"
    else:
        return "Other / No clear project classification"

# Score Resume
def score_resume(parsed_data, text):
    score = 0
    
    # Assign weight to experience (max 30)
    score += min(parsed_data["experience"], 6) * 5  # 5 points per year (max 30)
    
    # Assign weight to skills (max 20)
    score += min(len(parsed_data["skills"]) * 3, 20)  # 3 points per skill (max 20)
    
    # Assign weight based on CGPA (max 20)
    if parsed_data["cgpa"]:
        score += min(parsed_data["cgpa"] * 2, 20)  # Scaled CGPA scoring (max 20)
    
    # Assign weight based on percentage (max 10)
    if parsed_data["percentage"] and parsed_data["percentage"] >= 80:
        score += 10
    elif parsed_data["percentage"]:
        score += 5
    
    # Assign weight based on project type
    project_type = analyze_projects(text)
    if project_type == "Web Development":
        score += 15
    elif project_type == "Artificial Intelligence":
        score += 20
    elif project_type == "Both Web Development & AI":
        score += 25
    
    # Factor in readability score (max 10)
    grammar_score = check_grammar(text)
    if grammar_score > 60:
        score += 10
    elif grammar_score > 30:
        score += 5
    
    return min(score, 100)  # Max score capped at 100

# Main function to parse & score resume
def parse_and_score_resume(file_path):
    if file_path.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        return json.dumps({"error": "Unsupported file format"})

    parsed_data = parse_resume(text)
    parsed_data["grammar_score"] = check_grammar(text)
    parsed_data["project_type"] = analyze_projects(text)
    parsed_data["score"] = score_resume(parsed_data, text)
    parsed_data["extracted_text"] = text  # Also return extracted text

    return json.dumps(parsed_data, indent=4)

# Example Usage
if __name__ == "__main__":
    file_path = r"C:\\Users\\HP\\Desktop\\MyTasks\\Resume\\Prakhar_Resume.pdf"  # Change this to the actual file path
    print(parse_and_score_resume(file_path))
