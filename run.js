const se_scraper = require('./index.js');

// those options need to be provided on startup
// and cannot give to se-scraper on scrape() calls
let browser_config = {
    proxies: ['http://localhost:8000'],
    puppeteer_cluster_config: {
        timeout: 10 * 60 * 1000, // max timeout set to 10 minutes
        monitor: false,
        concurrency: 1, // one scraper per tab
        maxConcurrency: 1, // scrape with 1 tab
    }
};

(async () => {
    // scrape config can change on each scrape() call
    let scrape_config = {
        // which search engine to scrape
        search_engine: 'bing',
        // an array of keywords to scrape
        keywords: ['site:harvard.edu "john Halamka"'],
        // the number of pages to scrape for each keyword
        num_pages: 1,

        // OPTIONAL PARAMS BELOW:
        // google_settings: {
        //     gl: 'us', // The gl parameter determines the Google country to use for the query.
        //     hl: 'fr', // The hl parameter determines the Google UI language to return results.
        //     start: 0, // Determines the results offset to use, defaults to 0.
        //     num: 100, // Determines the number of results to show, defaults to 10. Maximum is 100.
        // },
        // instead of keywords you can specify a keyword_file. this overwrites the keywords array
        keyword_file: '',
        // how long to sleep between requests. a random sleep interval within the range [a,b]
        // is drawn before every request. empty string for no sleeping.
        sleep_range: '',
        // path to output file, data will be stored in JSON
        output_file: '',
        // whether to prevent images, css, fonts from being loaded
        // will speed up scraping a great deal
        block_assets: true,
        // check if headless chrome escapes common detection techniques
        // this is a quick test and should be used for debugging
        test_evasion: false,
        apply_evasion_techniques: true,
        // log ip address data
        log_ip_address: false,
        // log http headers
        log_http_headers: false,
    };

    let results = await se_scraper.scrape(browser_config, scrape_config);
    console.dir(results, {depth: null, colors: true});
})();

