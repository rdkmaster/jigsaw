module.exports = function filterNGMethods() {
  return {
    $runAfter: ['extra-docs-added'], $runBefore: ['computing-paths'], $process: function(docs) {
       const ngMethods =['ngOnChanges','ngOnInit','ngDoCheck','ngAfterContentInit','ngAfterContentChecked',
           'ngAfterViewInit','ngAfterViewChecked','ngOnDestroy'];
        return docs.forEach((doc) => {
               if(doc.members){
                  doc.members = doc.members.filter((member) => ngMethods.indexOf(member.name)== -1 )
                }
            });
    }
  };
};
