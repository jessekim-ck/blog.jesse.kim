
require("@babel/register");

require.extensions['.css'] = function () {
    return null;
};

require.extensions['.png'] = function () {
    return null;
};

require.extensions['.jpg'] = function () {
    return null;
};

require.extensions['.jpg'] = function () {
    return null;
};


const router = require("./router").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
        new Sitemap(router)
            .build("https://blog.weekend.kim")
            .save("./public/sitemap.xml")
    );
}

generateSitemap();
