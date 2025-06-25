

import sys
import json
import re
import os
from PyPDF2 import PdfReader
import spacy
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


try:
    nlp = spacy.load("en_core_web_md")
except:
    os.system("python -m spacy download en_core_web_md")
    nlp = spacy.load("en_core_web_md")

def extract_text_from_pdf(pdf_path):
    """Extract text content from a PDF file."""
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def preprocess_text(text):
    """Clean and preprocess text for analysis."""
    text = text.lower()
    
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    
    doc = nlp(text)
    

    tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    
    return " ".join(tokens)

def extract_skills(text):
    """Extract skills from resume text using NLP."""
    # Common tech skills
    tech_skills = [
        "python", "java", "javascript", "typescript", "c++", "c#", "ruby", "php", "swift", "kotlin",
        "html", "css", "sql", "nosql", "react", "angular", "vue", "node.js", "express", "django",
        "flask", "spring", "aws", "azure", "gcp", "docker", "kubernetes", "git", "jenkins", "ci/cd",
        "machine learning", "deep learning", "ai", "data science", "nlp", "computer vision",
        "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "mongodb", "postgresql", 
        "mysql", "redis", "elasticsearch", "graphql", "rest api", "microservices", "agile", 
        "scrum", "devops", "linux", "unix", "bash", "shell", "powershell", "jira", "confluence"
    ]
    
    # Soft skills
    soft_skills = [
        "communication", "teamwork", "leadership", "problem solving", "critical thinking",
        "creativity", "time management", "adaptability", "collaboration", "project management",
        "analytical skills", "attention to detail", "organization", "decision making",
        "interpersonal skills", "conflict resolution", "negotiation", "presentation"
    ]
    

    all_skills = tech_skills + soft_skills
    
    extracted_skills = []
    text_lower = text.lower()
    
    for skill in all_skills:
        if skill in text_lower:
            extracted_skills.append(skill)
    
    return extracted_skills

def analyze_compatibility(resume_text, job_description):
    """Analyze the compatibility between a resume and job description."""

    resume_processed = preprocess_text(resume_text)
    job_processed = preprocess_text(job_description)
    

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)
    

    if len(job_skills) == 0:
        skill_match_percentage = 0
    else:
        matching_skills = [skill for skill in resume_skills if skill in job_skills]
        skill_match_percentage = (len(matching_skills) / len(job_skills)) * 100
    
    # Calculate semantic similarity using TF-IDF and cosine similarity
    vectorizer = TfidfVectorizer()
    try:
        tfidf_matrix = vectorizer.fit_transform([resume_processed, job_processed])
        cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        semantic_score = cosine_sim * 100
    except:
        semantic_score = 0
    
    # Combine scores (weighted average)
    overall_score = int((skill_match_percentage * 0.7) + (semantic_score * 0.3))
    

    skills_match = []
    for skill in job_skills:
        if skill in resume_skills:

            match_score = np.random.randint(85, 100)
        else:
            # Check if semantically similar skills exist
            skill_doc = nlp(skill)
            max_similarity = 0
            for resume_skill in resume_skills:
                resume_skill_doc = nlp(resume_skill)
                similarity = skill_doc.similarity(resume_skill_doc)
                max_similarity = max(max_similarity, similarity)
            

            match_score = max(int(max_similarity * 70), 30)
        
        skills_match.append({
            "skill": skill,
            "match": match_score
        })
    

    skills_match = sorted(skills_match, key=lambda x: x["match"], reverse=True)
    

    strengths = [
        f"Strong proficiency in {skill['skill']}" 
        for skill in skills_match if skill['match'] >= 85
    ]
    

    if len([s for s in skills_match if s['match'] >= 80]) >= 3:
        strengths.append("Solid domain expertise relevant to the position")
    

    if len(strengths) < 3:
        strengths.append("Good foundation in required technical skills")
    

    gaps = [
        f"Limited experience with {skill['skill']}" 
        for skill in skills_match if skill['match'] <= 50
    ]
    

    recommendations = []
    
    # specific skill recommendations
    for skill in skills_match:
        if skill['match'] <= 60:
            recommendations.append(f"Develop skills in {skill['skill']}")
    
    # general recommendations
    if overall_score < 70:
        recommendations.append("Tailor your resume to highlight relevant experience for this position")
    
    if len([s for s in skills_match if s['match'] >= 80]) < 3:
        recommendations.append("Consider additional training in the core technologies for this role")
    
    # Limit recommendations avoid overwhelming
    recommendations = recommendations[:3]
    
    # least one recommendation
    if not recommendations:
        recommendations.append("Continue developing your expertise in this field")
    

    result = {
        "score": overall_score,
        "skillsMatch": skills_match[:5],  # Top 5 skills
        "strengths": strengths[:3],       # Top 3 strengths
        "gaps": gaps[:2],                 # Top 2 gaps
        "recommendations": recommendations
    }
    
    return result

def main():
    """Main function to process command line arguments and analyze compatibility."""
    if len(sys.argv) < 3:
        print("Usage: python resumeParser.py <resume_file_path> <job_description>")
        sys.exit(1)
    
    resume_path = sys.argv[1]
    job_description = sys.argv[2]
    

    resume_text = extract_text_from_pdf(resume_path)
    if not resume_text:
        print(json.dumps({"error": "Failed to extract text from the resume"}))
        sys.exit(1)
    

    result = analyze_compatibility(resume_text, job_description)
    

    print(json.dumps(result))

if __name__ == "__main__":
    main() 
    