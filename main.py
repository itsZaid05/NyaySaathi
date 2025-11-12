#!/usr/bin/env python3
"""
NyaySaathi Legal AI - Main Entry Point
"""

import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent))

from models.hybrid_rag_model import rag_model


def interactive_mode():
    """Interactive query mode"""
    print("\n" + "=" * 60)
    print("🏛️  NYAYSAATHI - AI Legal Assistant")
    print("=" * 60)
    print("\nType your legal question (or 'exit' to quit):\n")

    while True:
        user_input = input("Your Question: ").strip()

        if user_input.lower() == 'exit':
            print("Thank you for using NyaySaathi. Consult a lawyer for professional advice.")
            break

        if not user_input:
            continue

        print("\n🔍 Retrieving similar cases...")

        # Retrieve cases
        similar_cases = rag_model.retrieve_similar_cases(user_input)

        print(f"\n📋 Found {len(similar_cases)} similar cases:\n")
        for i, case in enumerate(similar_cases, 1):
            print(f"{i}. {case.case_name}")
            print(f"   Risk: {case.risk_level} | Verdict: {case.verdict}")
            print(f"   Laws: {', '.join(case.applicable_laws)}\n")

        # Generate analysis
        print("📝 Generating legal analysis...")
        analysis = rag_model.generate_case_analysis(user_input, similar_cases)
        print(f"\n{analysis}\n")

        # Risk classification
        risk = rag_model.classify_case_risk(user_input, similar_cases)
        print(f"⚠️  Risk Level: {risk['risk_level']} (Confidence: {risk['confidence']:.0%})\n")

        print("-" * 60 + "\n")


if __name__ == "__main__":
    print("Starting NyaySaathi Legal AI...")
    interactive_mode()
