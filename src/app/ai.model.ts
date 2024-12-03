export interface Session{
    prompt: (query: String)=>Promise<string>;
    promptStreaming: (query: string)=>Promise<Iterable<string>>;
    destroy:()=>void
}

interface CreateInput{
    systemPrompt: string;
}

export interface AIAssistantFactory{
    create:(input: CreateInput)=>Session
    capabilities:()=>void
}

export interface AI{
    languageModel: AIAssistantFactory
}

