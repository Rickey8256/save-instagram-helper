const saver_main = document.querySelector("main");
let saver_container = document.createElement("div");
saver_container.id = "saver_container";
saver_container.style.width = "100%";
saver_container = saver_main.insertBefore(saver_container, document.querySelector("div.v9tJq.AAaSh.VfzDr"));

let saver_display_url_list = [];

const saver_request = await fetch(`https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables=%7B%22id%22%3A%22${window._sharedData.entry_data.ProfilePage[0].graphql.user.id}%22%2C%22first%22%3A${window._sharedData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count}%7D`)
    .then(response => response.json());

saver_request.data.user.edge_owner_to_timeline_media.edges.forEach(function (e) {
    if (e.node.display_url) {
        saver_display_url_list.push(e.node.display_url);
    }
    if (e.node.edge_sidecar_to_children) {
        e.node.edge_sidecar_to_children.edges.forEach(function (e2) {
            if (e2.node.display_url) {
                saver_display_url_list.push(e2.node.display_url);
            }
        });
    }
});

saver_display_url_list.forEach(function (e) {
    saver_container.insertAdjacentHTML('beforeEnd', `<a href="${e}" style="padding:20px 10%;margin:auto;"><img src="${e}" style="background-repeat:cover;height:auto;max-height:60vh" download><a>`);
});
