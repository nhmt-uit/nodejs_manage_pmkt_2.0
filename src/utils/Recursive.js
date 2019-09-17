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

    async deleteParentAndChild (model, id, options) {
        if (!list || !Array.isArray(list))  return []

        options = {
            id: '_id',
            parentId: 'parent_id',
            children: 'children',
            ...options
        }

        try {
            let childMap = [id];
            const parentItem = model.findDoc({ options: { _id: id } })

            const recursiveMap = async ids => {
                await model.softDelete(req.params.id)

                ids.forEach(async id => {
                    const idMap = []

                    list.forEach(acc => {
                        if (String(acc[options.parentId]) === id) idMap.push(acc._id);
                    });

                    childMap = childMap.concat(idMap)

                    if (idMap.length) await recursiveMap(idMap);
                });
            }

            await recursiveMap(childMap)

            return childMap
        } catch (e) {
            return false;
        }
    }
}

export default new Recursive()