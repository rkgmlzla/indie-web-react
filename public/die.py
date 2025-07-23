import os
import pandas as pd

# 🔧 엑셀 파일들이 모여 있는 폴더 경로 (수정해줘!)
folder_path = r"C:\NER"  # ← 여기에 너의 엑셀 폴더 경로 넣기
output_path = r"C:\NER\merged_ner_data.txt"  # 저장할 txt 파일 경로

merged_lines = []

for file_name in os.listdir(folder_path):
    if file_name.endswith(".xlsx"):
        file_path = os.path.join(folder_path, file_name)
        df = pd.read_excel(file_path, header=None)

        for _, row in df.iterrows():
            token = str(row[0]).strip() if pd.notna(row[0]) else ""
            tag = str(row[1]).strip() if pd.notna(row[1]) else ""

            if token == "" and tag == "":
                merged_lines.append("")  # 🔹 공백 줄 → 게시물 구분
            else:
                merged_lines.append(f"{token} {tag}")

# 🔽 .txt 파일로 저장
with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(merged_lines))

print("✅ 텍스트 변환 완료:", output_path)
