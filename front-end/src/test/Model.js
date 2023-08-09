const articles = [
  {
    title: "흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야",
    singer: "장범준",
    author: "sample",
    score: `t100
    <d16'흔'd16'들'd8'리'd8'는'd8'꽃'c8'들'c8'속'd16'에'd4'서'
    d16''r2''f8'네'f8'샴'g8'푸'g8'향'g8'이'g8'느'f8'껴'd8'진'e16'거'd4'야'`,
  }
];

class FileModel {
  constructor() {
    this.list = articles;
  }

  getLatest() {
    const result = this.list.slice(0, 20);
    return result;
  }

  search(keyword) {
    keyword = keyword.trim();
    return this.list
      .filter((article) => article.title.includes(keyword))
      .slice();
  }

  save(article) {
    if (article.idx) {
      this.edit(article);
    } else {
      this.add(article);
    }
  }

  add(article) {
    article.idx = this.list.length;
    this.list.push(article);
  }

  edit(article) {
    const item = this.list.find((i) => i.idx === article.idx);
    item.author = article.author;
    item.score = article.score;
    item.singer = article.singer;
    item.title = article.title;
  }
}

export { FileModel };
