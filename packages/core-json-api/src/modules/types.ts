import { serializer } from "../serializer";

// Register 'article' type
serializer.register("article", {
    id: "id", // The attributes to use as the reference. Default = 'id'.
    blacklist: ["updated"], // An array of blacklisted attributes. Default = []
    links: {
        // An object or a function that describes links.
        self(data) {
            // Can be a function or a string value ex: { self: '/articles/1'}
            return "/articles/" + data.id;
        },
    },
    relationships: {
        // An object defining some relationships.
        author: {
            type: "people", // The type of the resource
            links(data) {
                // An object or a function that describes Relationships links
                return {
                    self: "/articles/" + data.id + "/relationships/author",
                    related: "/articles/" + data.id + "/author",
                };
            },
        },
        tags: {
            type: "tag",
        },
        photos: {
            type: "photo",
        },
        comments: {
            type: "comment",
            schema: "only-body", // A custom schema
        },
    },
    topLevelMeta(data, extraData) {
        // An object or a function that describes top level meta.
        return {
            count: extraData.count,
            total: data.length,
        };
    },
    topLevelLinks: {
        // An object or a function that describes top level links.
        self: "/articles", // Can be a function (with extra data argument) or a string value
    },
});

// Register 'people' type
serializer.register("people", {
    id: "id",
    links: {
        self(data) {
            return "/peoples/" + data.id;
        },
    },
});

// Register 'tag' type
serializer.register("tag", {
    id: "id",
});

// Register 'photo' type
serializer.register("photo", {
    id: "id",
});

// Register 'comment' type with a custom schema
serializer.register("comment", "only-body", {
    id: "_id",
});
