# Epidemic SFX Scraper
Scrapes (almost) all sound effects from epidemic sound using the low quality mp3 preview versions.

It can't actually download all due to a page cap being set at 50. This program downloads all sub genres, parent genres cant be downloaded since fetching those also includes all sub genres making it go above the 50 page cap. Some sub genres also go above the 50 page cap. But hey if you have that many sound effects from just one sub genre, I doubt you'd need any more.

# How to use?
Run the command ``npm run start`` and it should start working. It skips a genre if it sees it has already downloaded it before. So you can stop the program halfway through and pick it back up later on. If you want to redownload a specific genre, just delete the corresponding directory and run the program again.
