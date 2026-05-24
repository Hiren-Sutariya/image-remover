import os
import re

directory = 'src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original = content
            
            # Remove framer-motion imports
            content = re.sub(r"import\s+{[^}]*}\s+from\s+['\"]framer-motion['\"];?\n?", "", content)
            
            # Replace motion.div with div
            content = re.sub(r"<motion\.(\w+)", r"<\1", content)
            content = re.sub(r"</motion\.(\w+)>", r"</\1>", content)
            
            # Remove framer-motion props
            content = re.sub(r'\s+initial={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+animate={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+exit={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+transition={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+whileHover={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+whileTap={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+whileInView={{[^}]*}}\n?', '', content)
            content = re.sub(r'\s+viewport={{[^}]*}}\n?', '', content)
            
            # Remove AnimatePresence wrapper
            content = re.sub(r"<AnimatePresence[^>]*>", "", content)
            content = re.sub(r"</AnimatePresence>", "", content)

            if content != original:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")

