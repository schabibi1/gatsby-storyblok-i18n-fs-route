function rewriteSlug(slug) {
    const defaultLanguage = 'en/'
    let newSlug = slug
    // replaces /de/home with /de
    newSlug = newSlug.replace('home', '')
    // replaces /en/blog/first-post with /blog/first-post
    newSlug = newSlug.replace(defaultLanguage, '')
    return newSlug
}

export default rewriteSlug