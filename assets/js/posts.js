class Post {
    constructor(html) {
        let findComments = (el) => {
            let arr = [];
        
            if(!el) return arr;
        
            for (var i = 0; i < el.childNodes.length; i++) {
                let node = el.childNodes[i];
                if (node.nodeType === 8) {
                    arr.push(node);
                } else {
                    arr.push.apply(arr, findComments(node));
                }
            }
            return arr;
        };

        let converter = new showdown.Converter();
        converter.setFlavor('github');
        this.html = converter.makeHtml(html);
        let htmlParsed = $.parseHTML('<div>' + this.html + '</div>')[0];

        let comments = findComments(htmlParsed);

        if (!!comments && comments.length > 0) {
            this.title = comments.filter((c) => { c.data.indexOf('LsTitle') !== -1 })[0] || '';
            this.abreviation = comments.filter((c) => { c.data.indexOf('LsAbreviation') !== -1 })[0] || '';
            this.postDate = comments.filter((c) => { c.data.indexOf('LsPostDate') !== -1 })[0] || '';
        } else {
            this.title = htmlParsed.getElementsByTagName('h1')[0].innerText || '';
            this.abreviation = htmlParsed.getElementsByTagName('p')[0].innerText || '';
        }

        this.title = this.title || 'No title';
        this.abreviation = (this.abreviation || 'No short description').substring(0, 300);
        this.postDate = this.postDate || `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    }

    getPostThumbnail() {
        let template = `                
            <article>
                <h2 class="title-font">${this.title}</h2>
                <span class="post-date">${this.postDate}</span>
                <div class="content">
                    ${this.abreviation}
                </div>
                <a href="#" class="read-post-link">read post</a>
            </article>
        `;

        return $($.parseHTML(template.trim())[0]).data('content', this.html)[0];
    }
}