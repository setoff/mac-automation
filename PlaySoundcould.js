/**
  Starts play soundcloud.com player.
  Considerations:
  - soundcloud.com has been opened in Safari
  - soundcloud.com has play controls pane on the page
    It appears when you click play on any track, but it is absent when site just loaded.
  How to install:
  Launch Automator and tap File -> New (this dialog appears on launch)
    - select docuement type "Service"
    - add "Run JavaScript" action
    - paste this script
    - save
    This service should appear in any application Services menu. If didn't appear
			just copy this Automator workflow file to ~/Library/Services folder.
    - Tap it to launch
  Optional: add shortcut to service.
    - launch System preferencies -> Keyboard -> Shortcuts
    - select Services, select this service and type needed shortcut.
    I use ^⎇F8 it is pretty convenient ;)
*/


function run(input, parameters) {
	Safari = Application('Safari')
	for (var wndx in Safari.windows) {
		var window = Safari.windows[wndx]
		if (window.name() == 'Extensions' || window.name().length == 0) continue;
		sounds = window.tabs().filter(function(item) {
			if (item.url() == undefined) { return false }
			return item.url().indexOf('soundcloud.com') != -1
		})
		if (sounds.length == 1) {
			Safari.doJavaScript(
				'document.getElementsByClassName("playControl")[0].click()',
				{ in: sounds[0] })
			break
		}
	}
}
