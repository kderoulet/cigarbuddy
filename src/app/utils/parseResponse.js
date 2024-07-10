export default function parseResponse(response) {
    let result = []
    let content = /<recommendations>([\s\S]*?)<\/recommendations>/g.exec(response)[1]
    let titles = content.trim().split(/\\r\\n|\\n|\\r/)
        .map(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, ''))
        .filter(line => line.length > 0);
    let texts = [];
    let text;
    let regex =/<suggestion>([\s\S]*?)<\/suggestion>/g
    while ((text = regex.exec(response)) !== null) {
      texts.push(text[1]);
    }
    texts = texts.map(item => item.replace(/\\r\\n|\\n|\\r/g, '').trim());
    for (let i in titles) {
        let item = {}
        item['title'] = titles[i]
        item['text'] = texts[i]
        result.push(item)
    }
    return result
}