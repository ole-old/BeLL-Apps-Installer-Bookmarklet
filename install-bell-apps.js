var source = prompt('Which source server are you installing from?', 'http://bellappssource:installpass@bellappssource.cloudant.com')
var i = 0
alert("Install script loaded. Now replicating data from " + source)
// @todo Need the rest of the databases here
var databases = ["actions","apps","assignmentpaper","assignments","calendar","collectionlist","community","community_code","communityreports","configurations","courseschedule","coursestep","facilities","feedback","groups","install","invitations","mail","meetups","membercourseprogress","members","nationreports","newresources","report","requests","resourcefrequency","resources","shelf","stepresults","sync","usermeetups"]
// A recursive function to replicate the databases one at a time
var replicate = function() {
  var database = databases[i]
  $.couch.replicate(source + '/' + database, database, {
    success: function() {
      if (databases.length-1 > i) {
        i++
        replicate()
      }
      else {
        alert("Installation has completed")
        window.location = 'http://' + window.location.host + '/apps/_design/bell/lms/index.html'
      }
    },
    error: function(status) {
      console.log(status);
      alert('Something went wrong:' + status)
    }
  },
  {
    create_target: true
  })
}
// Start the recursion
replicate()
