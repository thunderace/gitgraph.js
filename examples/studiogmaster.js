var graphConfig = new GitGraph.Template({
  colors: [ "#9993FF", "#47E8D4", "#6BDB52", "#EAF72C", "#FFA657", "#F85BB5" ],
  branch: {
    color: "#000000",
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: "straight",
    showLabel: true, // display branch names on graph
    labelFont: "normal 10pt Arial",
    labelRotation: 0
  },
  commit: {
    spacingY: -30,
    dot: {
      size: 8,
      strokeColor: "#000000",
      strokeWidth: 4
    },
    tag: {
      font: "normal 10pt Arial",
      color: "yellow"
    },
    message: {
      color: "black",
      font: "normal 12pt Arial",
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
    }
  },
  arrow: {
    size: 8,
    offset: 3
  }
});

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal"
};

var bugFixCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Bug fix commit(s)"
};

var stabilizationCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Release stabilization commit(s)"
};

// You can manually fix columns to control the display.
var featureCol = 0;
var pbrdevCol = 1;
var releaseCol = 2;
var studioReleaseCol = 3;
var studioFeatureCol = 5;
var masterCol = 4;

var gitgraph = new GitGraph(config);

var gmaster = gitgraph.branch({
  name: "gmaster",
  column: masterCol
});
gmaster.commit("Initial commit");
gmaster.commit("second commit");

//####################RELEASE############################
var release_studio_200 = gitgraph.branch({
  parentBranch: gmaster,
  name: "release/studio/v2.0.0",
  column: studioReleaseCol
});

release_studio_200.commit({
  message: "Release v2.0.0",
  tag: "v2.0.0",
});

var pbrdev = gitgraph.branch({
  parentBranch: release_studio_200,
  name: "pbrdev",
  column: pbrdevCol
});
pbrdev.commit("commit#pbr")
//Studio implements a new feature
gmaster.commit("commit#studio")
var studiofeature1 = gitgraph.branch({
  parentBranch: gmaster,
  name: "studio_feature/1",
  column: studioFeatureCol
});

studiofeature1.commit("A feature to go into v2.0.x").commit({
  messageDisplay: false
});
studiofeature1.merge(gmaster);



//PBR work in parallel

pbrdev.commit({
  messageDisplay: false
});

var pbrFeature1 = gitgraph.branch({
  parentBranch: pbrdev,
  name: "pbr-feature/1",
  column: featureCol
});
pbrFeature1.commit("A feature to go into v1.0.0").commit({
  messageDisplay: false
});
pbrFeature1.merge(pbrdev);

gmaster.commit("commit#studio")

//####################RELEASE############################
//Release first studio by pbr which would be studio_2.0.1
pbrdev.commit("commit#pbr")
var pbr_releases_studio_201 = gitgraph.branch({
  parentBranch: pbrdev,
  name: "release/studio/v2.0.1",
  column: releaseCol
});
pbr_releases_studio_201.commit({
  message: "Release v2.0.1",
  tag: "v2.0.1",
  tagColor: "#6BDB52"
});
pbrdev.commit({
  messageDisplay: false
});
pbr_releases_studio_201.merge(gmaster, {
  dotStrokeWidth: 15,
  message: "Merge v2.0.1 in gmaster",
//  tag: "v2.0.1"
});


//Another feature in pbrstudio
var feature2 = gitgraph.branch({
  parentBranch: pbrdev,
  name: "pbr-feature/2",
  column: featureCol
});
feature2.commit("Another feature to go into v2.0.1").commit({
  messageDisplay: false
});
feature2.merge(pbrdev);


//Studio implements a new feature
gmaster.commit("commit#studio")
var studiofeature2 = gitgraph.branch({
  parentBranch: gmaster,
  name: "studio_feature/2",
  column: studioFeatureCol
});

studiofeature2.commit("A feature to go into v2.0.x").commit({
  messageDisplay: false
});
studiofeature2.merge(gmaster);
//gmaster.merge(pbrdev);


//PBR pbrFeature3  //todo save space for now
//pbrdev.commit("commit#pbr")
//var pbrFeature3 = gitgraph.branch({
//  parentBranch: pbrdev,
//  name: "pbr-feature/3",
//  column: featureCol
//});
//
//pbrFeature3.commit("A feature to go into v2.0.3").commit({
//  messageDisplay: false
//});
//pbrFeature3.merge(pbrdev);

//####################RELEASE############################
//PBR release2 202
var pbr_releases_studio_202 = gitgraph.branch({
  parentBranch: pbrdev,
  name: "release/v2.0.2",
  column: releaseCol
});

pbr_releases_studio_202.commit({
  message: "Release v2.0.2",
  tag: "v2.0.2",
  tagColor: "#6BDB52"
});

pbr_releases_studio_202.merge(gmaster, {
  dotStrokeWidth: 15,
  message: "Merge v2.0.2 in gmaster",
//  tag: "v2.0.2"
});
//####################RELEASE############################

pbrdev.commit("commit#pbr")

//Studio implements a new feature
var studiofeature3 = gitgraph.branch({
  parentBranch: gmaster,
  name: "studio_feature/3",
  column: studioFeatureCol
});

studiofeature3.commit("A feature to go into v2.0.3").commit({
  messageDisplay: false
});
studiofeature3.merge(gmaster);


//####################RELEASE############################
//Studio releases v2.0.3
var studio_releases_studio_203 = gitgraph.branch({
  parentBranch: gmaster,
  name: "release/v2.0.3",
  column: studioReleaseCol
});

studio_releases_studio_203.commit({
  message: "Release v2.0.3",
  tag: "v2.0.3",
//  tagColor: 'gray'
});

studio_releases_studio_203.merge(pbrdev, {
  dotStrokeWidth: 15,
  message: "Release v2.0.3 tagged",
//  tag: "v2.0.3"
});

//#######################################################
gmaster.commit("commit#studio")
pbrdev.commit("commit#pbr")
gmaster.commit("commit#studio")
pbrdev.commit("commit#pbr")

