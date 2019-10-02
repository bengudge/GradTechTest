function createMenuData(data) {
  const pattern = /(\w?parent\w?)\/(\w*parent[0-9]child\w*)/;
  let match;
  let parents = [];

  for(i = 0; i < data.length; i++) {
    let parent = {
      title: "",
      data: []
    };
    match = pattern.exec(data[i]);

    if(match != null) {
      if(parents.some(parent => parent.title === match[1])) {
        for(j = 0; 0 < parents.length; j++) {
          if(parents[j].title && parents[j].data) {
            if (match[1] == parents[j].title) {
              parents[j].data.push(match[2]);
              break;
            }
          }

        }
      } else {
        parent.title = match[1];
        parent.data.push(match[2]);
        parents.push(parent);
      }
    }
  }
  return parents;
}

describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];

      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];

      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });