/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

var mcName = 'Alberto Piñar';

const welcomeText = '<amazon:emotion name="excited" intensity="high"> \
                        <prosody volume="x-loud"> \
                            <say-as interpret-as="interjection">Guau.</say-as> <say-as interpret-as="interjection">Estoy flipando. </say-as><say-as interpret-as="interjection">¡Cuánta gente!</say-as> \
                        </prosody> \
                        <break time="0.5s"/> Menos mal que las asistentes de voz no nos ponemos nerviosas. <amazon:effect name="whispered"><break time="0.2s"/><prosody volume="x-loud">Bueno, quizás un poquito sí.</prosody> </amazon:effect><break time="0.3s"/>\
                        Hoy presentamos TEL MI, un proyecto en el que yo participo. Estoy segura de que revolucionará el sector inmobiliario. Ya veréis...<break time="0.1s"/> <say-as interpret-as="interjection">es la caña. </say-as> \
                        <break time="0.2s"/> \
                        Hoy estarán con nosotros, Alberto Piñar, Francisco Sánchez, Jose Antonio Montoro, y Juan Candáu, de la empresa gueinkoud. \
                        Y Alberto Conesa de Branding center. Yo me voy ahora, pero vuelvo en un rato, así que os dejo con Alberto Piñar, \
                        <break time="0.1s"/> <say-as interpret-as="interjection">hasta luego</say-as> \
                        </amazon:emotion>';
const restText = '<amazon:emotion name="excited" intensity="high"> <say-as interpret-as="interjection">Oh yeah</say-as>. Ya que me conocéis un poquito más, vamos a hacer un descanso y así picais algo..que he visto al fondo a gente con más hambre que el perro de un ciego. <say-as interpret-as="interjection">qué aproveche</say-as></amazon:emotion>';
const goodbyeText = '<amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Genial</say-as>. Muchas gracias a Alberto Conesa <break time="0.2s"/>. Por último, y para cerrar la presentación, abrimos el proceso de reserva para implementar el ecosistema TELMI. Entrad en el enlace y dejad vuestros datos <break time="0.5s"/>.<say-as interpret-as="interjection">Venga</say-as>. ¡Cuanto antes reserves, antes tendrás a TELMI en tu agencia!. <say-as interpret-as="interjection">Muchas gracias</say-as> a todos.</amazon:emotion>'

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola!, Bienvenido a la skill que os ayudará a presentar Telmi. Puedes pedirme que inicie el evento y, llegado el momento también te ayudaré con la despedida. ¿Qué puedo hacer por ti?.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const OpenEventIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpenEvent';
    },
    handle(handlerInput) {
        const speakOutput = welcomeText;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const RestIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Rest';
    },
    handle(handlerInput) {
        const speakOutput = restText;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const CloseEventIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CloseEvent';
    },
    handle(handlerInput) {
        const speakOutput = goodbyeText;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Te prestaré ayuda en las tres fases de la presentación. Para iniciar puedes comenzar con la frase, "presenta el evento". Si quieres dar un descanso a los asistentes prueba a decir, "hagamos una pausa". Por último, puedo ayudarte a despedir el evento con la frase "nos vamos".   ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento, con eso no puedo ayudarte por ahora. Si necesitas saber qué hacer, prueba a decir, "ayuda".';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Has lanzado el intent llamado, ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento. Tuve problemas al llevar a cabo esta acción. Inténtalo de nuevo más tarde.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OpenEventIntentHandler,
        RestIntentHandler,
        CloseEventIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();