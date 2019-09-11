class Recursive {
    flatToTree (list, options) {
        if (!list || !Array.isArray(list))  return []

        options = {
            id: "_id",
            parentId: "parent_id",
            children: "children",
            ...options
        }

        const map = {}, roots = []
        let node = {}

        list.forEach((item, idx) => {
            map[item._id] = idx
            item[options.children] = []
        })

        list.forEach(item => {
            node = item
            if (node[options.parentId] !== null) {
                if (map[node[options.parentId]]) list[map[node[options.parentId]]][options.children].push(node)
            } else {
                roots.push(node)
            }
        })

        return roots
    }
}


export default new Recursive();