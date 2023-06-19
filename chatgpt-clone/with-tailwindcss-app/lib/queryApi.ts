import openai from "./chatgpt";

//didn't use chatID here but you would use chatID to build a contextual response from the previous response if needed for future builds
const query = async (prompt: string, chatId: string, model: string) => {
    // temperature and top_p is what determines the level of creativity in the response from the GPT. The current set value is more on the creative side than logical
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        //returning the first choices of multiple responses
    }).then(res => res.data.choices[0].text)
    .catch(
        (err) => 
        `chatGPT couldn't find the answer (Error: ${err.message})`
    );

    return res;
};
 
export default query;