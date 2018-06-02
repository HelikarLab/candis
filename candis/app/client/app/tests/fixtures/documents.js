export default {
    "documents": [
      {
        "ID": "HyRC6Gyl7",
        "output": {
          "format": "pipeline",
          "name": "jestReact.cpipe",
          "path": "/home/rupav/opensource/candis/CRES"
        },
        "data": [
          {
            "ID": "Hy7wMAz1lm",
            "code": "dat.fle",
            "name": "File",
            "icon": "/assets/img/icons/document.png",
            "label": "CRES/datum14.cdata",
            "value": {
              "format": "cdata",
              "name": "datum14.cdata",
              "path": "CRES"
            },
            "status": "READY"
          },
          {
            "ID": "rkB7RMkeX",
            "code": "prp.kcv",
            "name": "k-Fold Cross-Validation",
            "icon": "/assets/img/icons/cross-validation.png",
            "label": "3 folds",
            "value": "3",
            "status": "READY"
          },
          {
            "ID": "ByCmRfygQ",
            "code": "ats",
            "name": " Best First +  Cfs Subset Eval",
            "value": {
              "evaluator": {
                "name": "CfsSubsetEval"
              },
              "search": {
                "name": "BestFirst",
                "options": [
                  "-D",
                  "1",
                  "-N",
                  "5"
                ]
              },
              "use": true
            },
            "status": "READY"
          },
          {
            "ID": "HkmVAM1l7",
            "code": "lrn",
            "name": "Naive Bayes",
            "value": {
              "label": "Naive Bayes",
              "name": "bayes.NaiveBayes",
              "use": true
            },
            "status": "READY"
          }
        ],
        "active": true
      }
    ],
    "active": {
      "ID": "HyRC6Gyl7",
      "output": {
        "format": "pipeline",
        "name": "jestReact.cpipe",
        "path": "/home/rupav/opensource/candis/CRES"
      },
      "data": [
        {
          "ID": "Hy7wMAz1lm",
          "code": "dat.fle",
          "name": "File",
          "icon": "/assets/img/icons/document.png",
          "label": "CRES/datum14.cdata",
          "value": {
            "format": "cdata",
            "name": "datum14.cdata",
            "path": "CRES"
          },
          "status": "READY"
        },
        {
          "ID": "rkB7RMkeX",
          "code": "prp.kcv",
          "name": "k-Fold Cross-Validation",
          "icon": "/assets/img/icons/cross-validation.png",
          "label": "3 folds",
          "value": "3",
          "status": "READY"
        },
        {
          "ID": "ByCmRfygQ",
          "code": "ats",
          "name": " Best First +  Cfs Subset Eval",
          "value": {
            "evaluator": {
              "name": "CfsSubsetEval"
            },
            "search": {
              "name": "BestFirst",
              "options": [
                "-D",
                "1",
                "-N",
                "5"
              ]
            },
            "use": true
          },
          "status": "READY"
        },
        {
          "ID": "HkmVAM1l7",
          "code": "lrn",
          "name": "Naive Bayes",
          "value": {
            "label": "Naive Bayes",
            "name": "bayes.NaiveBayes",
            "use": true
          },
          "status": "READY"
        }
      ],
      "active": true
    },
    "nodes": {
      "dat.fle": {
        "icon": "/assets/img/icons/document.png"
      },
      "prp.kcv": {
        "icon": "/assets/img/icons/cross-validation.png"
      },
      "ats": {},
      "lrn": {}
    },
    "running": null,
    "status": [],
    "errors": []
  }