import PyPDF2
import re


def get_pdf_path():
    """Returns a hardcoded PDF file path."""
    # Hardcoded file path
    file_path = r"E:\testweb\files\Computer Network- - part 1.pdf"

    return file_path


def search_in_pdf(pdf_path, search_term, context_length=100):
    """Searches for a term in the PDF and prints the context around it."""
    try:
        # Open the PDF file
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            found = False

            # Iterate through all the pages
            for page_num in range(num_pages):
                page = reader.pages[page_num]
                text = page.extract_text()

                if text:  # Check if text extraction was successful
                    # Search for the term and extract following text
                    for match in re.finditer(search_term, text, re.IGNORECASE):
                        start_index = match.end()
                        end_index = start_index + context_length
                        context = text[start_index:end_index]
                        print(f"Found '{search_term}' on page {page_num + 1}: {context}")
                        found = True

            if not found:
                print(f"'{search_term}' not found in the document.")
    except FileNotFoundError:
        print(f"The file {pdf_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")


# Example usage
pdf_path = get_pdf_path()
if pdf_path:
    search_term = 'protocol'
    search_in_pdf(pdf_path, search_term)
else:
    print("No file selected.")
