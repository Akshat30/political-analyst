# Script to extract html code from a website
# libraries
import urllib.request
from bs4 import BeautifulSoup

# Returns all the transcript links present on the given rev.com link


def getLinks(url):
    # Fetching the html
    try:
        request = urllib.request.Request(url)
        content = urllib.request.urlopen(request)
        # Parsing the html
        parse = BeautifulSoup(content, 'html.parser')
    except urllib.error.URLError as e:
        print(f"An error occurred: {e}")
        return None

    # Provide html elements' attributes to extract the data
    div_tags = parse.find_all('div', attrs={'fl-post-column'})
    links = []

    for div_tag in div_tags:
        a_tag = div_tag.find('a')
        if a_tag:
            link = a_tag['href']
            links.append(link)

    return links

# Returns the transcript of speech from the given link for rev


def getTranscript(link):
    # Fetching the html
    req = urllib.request.Request(link)
    con = urllib.request.urlopen(req)

    # Parsing the html
    soup = BeautifulSoup(con, 'html.parser')

    div_tags = soup.find_all('div', attrs={'fl-callout-text'})

    # Extract and format the text from each <p> tag
    formatted_text = ""

    for div_tag in div_tags:
        text = div_tag.get_text(strip=True)
        if text:
            # Add two newline characters to separate transcript entries
            formatted_text += text + "\n\n"

    return formatted_text


# categorylink = 'https://www.rev.com/blog/transcript-category/political-transcripts'

# links = getLinks(categorylink)
# with open(r'political-transcripts-links.txt', 'w') as fp:
#     fp.write("Page: " + str(1) + "\n")
#     for item in links:
#         # write each item on a new line
#         fp.write("%s\n" % item)

# for i in range(38, 101):
#     print('page: ' + str(i))
#     curLinks = getLinks(
#         categorylink+'/page/'+str(i))
#     with open(r'political-transcripts-links.txt', 'a') as fp:
#         fp.write("Page: " + str(i) + "\n")
#         for item in curLinks:
#             # write each item on a new line
#             print(item)
#             fp.write("%s\n" % item)


# for i in range(2, 253):
#     print('page: ' + str(i))
#     curLinks = getLinks(
#         categorylink+str(i))
#     links.extend(curLinks)
# with open(r'political-transcripts-links.txt', 'w') as fp:
#     for item in links:
#         # write each item on a new line
#         fp.write("%s\n" % item)


# with open('trump-links.csv', 'a') as csv_file:
#   writer = csv.writer(csv_file, delimiter=' ')
# #   writer.writerow(['Title', 'Author'])
#   for col1 in zip(links):
#     writer.writerow([col1])
