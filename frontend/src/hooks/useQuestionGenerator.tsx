import React, {useState} from 'react'

const useQuestionGenerator = () => {

    const [questionList, setQuestionList] = useState<string[]>([
        "Question 1",
        "Question 2",
        "If this succeeds what does the world look like?"
    ])
    
    const generateQuestions = (): string[] => {
        return questionList
    };

    

    return {
        generateQuestions
    };
};
export default useQuestionGenerator;