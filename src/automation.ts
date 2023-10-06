import { AutomationStepInput } from "@budibase/types"
import { Configuration, OpenAIApi } from "openai"

export default async function run({ inputs }: AutomationStepInput) {

  if (inputs.openai_api_key == null) {
    return {
      success: false,
      response: "Budibase OpenAI Automation Failed: No OpenAI API Key supplied",
    }
  }

  if (inputs.prompt == null) {
    return {
      success: false,
      response: "Budibase OpenAI Automation Failed: No prompt supplied",
    }
  }

  try {
    const configuration = new Configuration({
      apiKey: inputs.openai_api_key,
    })

    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: inputs.model,
      messages: [
        {
          role: "user",
          content: inputs.prompt,
        },
      ],
    })

    const response = completion?.data?.choices[0]?.message?.content

    return {
      response,
      success: true,
    }
  } catch (err) {
    return {
      success: false,
      response: JSON.stringify(err),
    }
  }
}

