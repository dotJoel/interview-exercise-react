export function validateTweet(tweet) {
    if (tweet.message.length > 240) {
        throw new Error('The maximum length of tweets is 240 characters.');
    }
}
