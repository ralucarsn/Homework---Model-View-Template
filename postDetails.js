class PostDetailsView {
    postsModel = new PostsModel();
    usersModel = new UsersModel();
    commentsModel = new CommentsModel();
    
    constructor() {
        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);
        this.postComm = this.handleCommentFormSubmit;
        document.querySelector('[data-comment-form]').addEventListener("submit", e => this.postComm(e));
    }

    getPostId() {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    }

    hidrateHtml(data) {
       data.then(post => {
            this.hidrateAuthor(post);
            this.hidrateComments(post);

            const titleElem = document.querySelector('[data-post="tile"]');
            const bodyElem = document.querySelector('[data-post="body"]');

            titleElem.innerText = post.title;
            bodyElem.innerText = post.body;
       })
    }

    hidrateAuthor(post) {
        this.usersModel.getUserById(post.id)
        .then(user => {
            const authorElem = document.querySelector('[data-post="author"]');
            
            authorElem.innerText = user.name;
        }) 
    }

    hidrateComments(post) {
        this.commentsModel.getCommentForPost(post.id).then(comments => {

            const fragment = document.createDocumentFragment();

            for (const comment of comments) {
                
                const i = document.createElement('i');
                const h = document.createElement('h5');
                const p = document.createElement('p');

                h.innerText = comment.email + " :";
                i.innerText ='"' +  comment.body + '"';

                p.append(i);
                fragment.append(h, p);
            }
            
            this.appendComments(fragment)

        });
    }

    appendComments(fragment) {
        const comments = document.querySelector('[data-post="comments"]');

        comments.append(fragment);
    }

    handleCommentFormSubmit(e) {
        e.preventDefault();
        // logica de add comment

        const comment = document.querySelector("[data-comment]").value;
        const email = "ralucarsn$gmail.com";
        
        this.commentsModel.createComment(comment, email)
        .then(console.log);
        // pentru aplicatia noastra vom transmite intotdeauna id 1 pentru user
    }
}

new PostDetailsView();

