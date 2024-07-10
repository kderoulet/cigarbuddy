'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import cigarBuddyLogo from './assets/cigarbuddy-preferrededit.png'
import cigarBuddy from './assets/cigarbuddy png_prev_ui.png'
import checkCigarInput from './utils/checkCigarInput'
import findCigarHref from './utils/findCigarHref'
import parseResponse from './utils/parseResponse'

const brandsDict = {"601":{"name":"601 Cigars","href":"/shop/601-cigars/2008348/?shop=Cigars"},"5vegas":{"name":"5 Vegas Cigars","href":"/shop/5-vegas-cigars/1701004/?shop=Cigars"},"vegas":{"name":"5 Vegas Cigars","href":"/shop/5-vegas-cigars/1701004/?shop=Cigars"},"acid":{"name":"ACID Cigars","href":"/shop/acid-cigars/1701011/?shop=Cigars"},"aganorsa":{"name":"Aganorsa Leaf Cigars","href":"/shop/aganorsa-leaf-brand/1702100/?shop=Cigars"},"aging":{"name":"Aging Room Cigars","href":"/shop/aging-room-cigars-brand/1702008/?shop=Cigars"},"room":{"name":"Aging Room Cigars","href":"/shop/aging-room-cigars-brand/1702008/?shop=Cigars"},"aj":{"name":"AJ Fernandez Cigars","href":"/shop/aj-fernandez-premium-cigar-brands/2012674/?shop=Cigars"},"fernandez":{"name":"AJ Fernandez Cigars","href":"/shop/aj-fernandez-premium-cigar-brands/2012674/?shop=Cigars"},"alec":{"name":"Alec Bradley Cigars","href":"/shop/alec-bradley-cigars/1701015/?shop=Cigars"},"bradley":{"name":"Alec Bradley Cigars","href":"/shop/alec-bradley-cigars/1701015/?shop=Cigars"},"arganese":{"name":"Arganese Cigars","href":"/shop/arganese-brand/1701024/?shop=Cigars"},"fuente":{"name":"Arturo Fuente Cigars","href":"/shop/arturo-fuente-cigars/1701026/?shop=Cigars"},"arturo":{"name":"Arturo Fuente Cigars","href":"/shop/arturo-fuente-cigars/1701026/?shop=Cigars"},"ashton":{"name":"Ashton Cigars","href":"/shop/ashton-cigars/1701028/?shop=Cigars"},"asylum":{"name":"Asylum Cigars","href":"/shop/asylum-brand/1701031/?shop=Cigars"},"ave":{"name":"Ave Maria Cigars","href":"/shop/ave-maria-brand/1701035/?shop=Cigars"},"maria":{"name":"Ave Maria Cigars","href":"/shop/ave-maria-brand/1701035/?shop=Cigars"},"avo":{"name":"AVO Cigars","href":"/shop/avo-brand/1701036/?shop=Cigars"},"baccarat":{"name":"Baccarat Cigars","href":"/shop/baccarat-brand/1701038/?shop=Cigars"},"bahia":{"name":"Bahia Cigars","href":"/shop/bahia-brand/1701042/?shop=Cigars"},"black":{"name":"Black Label Trading Co. Cigars","href":"/shop/black-label-trading-co-cigars/2055280/?shop=Cigars"},"label":{"name":"Black Label Trading Co. Cigars","href":"/shop/black-label-trading-co-cigars/2055280/?shop=Cigars"},"trading":{"name":"Black Label Trading Co. Cigars","href":"/shop/black-label-trading-co-cigars/2055280/?shop=Cigars"},"caldwell":{"name":"Caldwell Cigars","href":"/shop/caldwell-brand/2044920/?shop=Cigars"},"camacho":{"name":"Camacho Cigars","href":"/shop/camacho-brand-cigars/1701078/?shop=Cigars"},"cao":{"name":"CAO Cigars","href":"/shop/cao-brand-cigars/1701081/?shop=Cigars"},"ci":{"name":"CI Knock-Offs Cigars","href":"/shop/ci-knock-offs-brand/1701127/?shop=Cigars"},"knock-offs":{"name":"CI Knock-Offs Cigars","href":"/shop/ci-knock-offs-brand/1701127/?shop=Cigars"},"legends":{"name":"CI Legends Cigars","href":"/shop/ci-legends-brand/1701128/?shop=Cigars"},"cle":{"name":"CLE Cigars","href":"/shop/cle-brand/1701132/?shop=Cigars"},"cohiba":{"name":"Cohiba Cigars","href":"/shop/cohiba-cigars/1701138/?shop=Cigars"},"crowned heads":{"name":"Crowned Heads Cigars","href":"/shop/crowned-heads-brand/1701687/?shop=Cigars"},"heads":{"name":"Crowned Heads Cigars","href":"/shop/crowned-heads-brand/1701687/?shop=Cigars"},"cuba":{"name":"Cuba Libre Cigars","href":"/shop/cuba-libre-brand/1701150/?shop=Cigars"},"libre":{"name":"Cuba Libre Cigars","href":"/shop/cuba-libre-brand/1701150/?shop=Cigars"},"daniel":{"name":"Daniel Marshall Cigars","href":"/shop/daniel-marshall-cigars/1701569/?shop=Cigars"},"marshall":{"name":"Daniel Marshall Cigars","href":"/shop/daniel-marshall-cigars/1701569/?shop=Cigars"},"davidoff":{"name":"Davidoff Cigars","href":"/shop/davidoff-cigars/1701162/?shop=Cigars"},"diesel":{"name":"Diesel Cigars","href":"/shop/diesel-cigars/1701005/?shop=Cigars"},"djarum":{"name":"Djarum Filtered Cigars","href":"/shop/djarum-filtered-cigars/2026620/?shop=Cigars"},"pepin":{"name":"Don Pepin Garcia Cigars","href":"/shop/don-pepin-garcia-brand/1701193/?shop=Cigars"},"rafael":{"name":"Don Rafael Cigars","href":"/shop/don-rafael-brand/1701194/?shop=Cigars"},"drew":{"name":"Drew Estate Cigars","href":"/shop/drew-estate-cigars/1701201/?shop=Cigars"},"estate":{"name":"Drew Estate Cigars","href":"/shop/drew-estate-cigars/1701201/?shop=Cigars"},"dunbarton":{"name":"Dunbarton Tobacco & Trust Cigars","href":"/shop/dunbarton-tobacco-trust-cigars/2021424/?shop=Cigars"},"ep":{"name":"E.P. Carrillo Cigars","href":"/shop/e-p-carrillo-brand-cigars/1701216/?shop=Cigars"},"e.p.":{"name":"E.P. Carrillo Cigars","href":"/shop/e-p-carrillo-brand-cigars/1701216/?shop=Cigars"},"carrillo":{"name":"E.P. Carrillo Cigars","href":"/shop/e-p-carrillo-brand-cigars/1701216/?shop=Cigars"},"espinosa":{"name":"Espinosa Cigars","href":"/shop/espinosa-cigar-brand/1701220/?shop=Cigars"},"foundation":{"name":"Foundation Cigar Company Cigars","href":"/shop/foundation-cigar-company/2009227/?shop=Cigars"},"fratello":{"name":"Fratello Cigars","href":"/shop/fratello-cigars/2055842/?shop=Cigars"},"gispert":{"name":"Gispert Cigars","href":"/shop/gispert-brand/1701246/?shop=Cigars"},"gran":{"name":"Gran Habano Cigars","href":"/shop/gran-habano-brand/1701254/?shop=Cigars"},"habano":{"name":"Gran Habano Cigars","href":"/shop/gran-habano-brand/1701254/?shop=Cigars"},"graycliff":{"name":"Graycliff Cigars","href":"/shop/graycliff-brand-cigars/1701256/?shop=Cigars"},"gurkha":{"name":"Gurkha Cigars","href":"/shop/gurkha-cigars/1701262/?shop=Cigars"},"upmann":{"name":"H. Upmann Cigars","href":"/shop/h-upmann-brand-cigars/1701284/?shop=Cigars"},"hc":{"name":"HC Series Cigars","href":"/shop/hc-series-brand/1701271/?shop=Cigars"},"hoyo":{"name":"Hoyo de Monterrey Cigars","href":"/shop/hoyo-de-monterrey-brand/2036706/?shop=Cigars"},"monterrey":{"name":"Hoyo de Monterrey Cigars","href":"/shop/hoyo-de-monterrey-brand/2036706/?shop=Cigars"},"hvc":{"name":"HVC Cigars","href":"/shop/hvc-brand/2055278/?shop=Cigars"},"illusione":{"name":"Illusione Cigars","href":"/shop/illusione-brand/1701287/?shop=Cigars"},"java":{"name":"Java by Drew Estate Cigars","href":"/shop/java-by-drew-estate-brand/1701292/?shop=Cigars"},"jm":{"name":"JM Tobacco Cigars","href":"/shop/jm-tobacco-brand/1701857/?shop=Cigars"},"joya":{"name":"Joya de Nicaragua Cigars","href":"/shop/joya-de-nicaragua-brand-cigars/1701299/?shop=Cigars"},"kristoff":{"name":"Kristoff Cigars","href":"/shop/kristoff-brand/1701305/?shop=Cigars"},"aroma":{"name":"La Aroma de Cuba Cigars","href":"/shop/la-aroma-de-cuba-brand/1701306/?shop=Cigars"},"aurora":{"name":"La Aurora Cigars","href":"/shop/la-aurora-brand-cigars/1701307/?shop=Cigars"},"gloria":{"name":"La Gloria Cubana Cigars","href":"/shop/la-gloria-cubana-brand/1701317/?shop=Cigars"},"palina":{"name":"La Palina Cigars","href":"/shop/la-palina-brand/1701844/?shop=Cigars"},"perla":{"name":"La Perla Habana Cigars","href":"/shop/la-perla-habana-brand/1701322/?shop=Cigars"},"habana":{"name":"La Perla Habana Cigars","href":"/shop/la-perla-habana-brand/1701322/?shop=Cigars"},"l'atelier":{"name":"L'Atelier Cigars","href":"/shop/latelier-brand/1701327/?shop=Cigars"},"latelier":{"name":"L'Atelier Cigars","href":"/shop/latelier-brand/1701327/?shop=Cigars"},"atelier":{"name":"L'Atelier Cigars","href":"/shop/latelier-brand/1701327/?shop=Cigars"},"latitude zero":{"name":"Latitude Zero Cigars","href":"/shop/latitude-zero-cigars/2054534/?shop=Cigars"},"zero":{"name":"Latitude Zero Cigars","href":"/shop/latitude-zero-cigars/2054534/?shop=Cigars"},"macanudo":{"name":"Macanudo Cigars","href":"/shop/macanudo-cigars/1701344/?shop=Cigars"},"mano'war":{"name":"Man O' War Cigars","href":"/shop/man-o-war-brand-cigars/1701353/?shop=Cigars"},"manowar":{"name":"Man O' War Cigars","href":"/shop/man-o-war-brand-cigars/1701353/?shop=Cigars"},"man-o-war":{"name":"Man O' War Cigars","href":"/shop/man-o-war-brand-cigars/1701353/?shop=Cigars"},"man":{"name":"Man O' War Cigars","href":"/shop/man-o-war-brand-cigars/1701353/?shop=Cigars"},"war":{"name":"Man O' War Cigars","href":"/shop/man-o-war-brand-cigars/1701353/?shop=Cigars"},"mark":{"name":"Mark Twain Cigars","href":"/shop/mark-twain-cigars/2056268/?shop=Cigars"},"twain":{"name":"Mark Twain Cigars","href":"/shop/mark-twain-cigars/2056268/?shop=Cigars"},"montecristo":{"name":"Montecristo Cigars","href":"/shop/montecristo-cigars/1701371/?shop=Cigars"},"father":{"name":"My Father Cigars","href":"/shop/my-father-brand-cigars/1701378/?shop=Cigars"},"nica":{"name":"Nica Libre Cigars","href":"/shop/nica-libre-brand-cigars/2040158/?shop=Cigars"},"nub":{"name":"Nub Cigars","href":"/shop/nub-cigar-brand-by-oliva/1701389/?shop=Cigars"},"oliva":{"name":"Oliva Cigars","href":"/shop/oliva-cigars/1701392/?shop=Cigars"},"padron":{"name":"Padron Cigars","href":"/shop/padron-cigars/1701404/?shop=Cigars"},"partagas":{"name":"Partagas Cigars","href":"/shop/partagas-brand-cigars/1701410/?shop=Cigars"},"perdomo":{"name":"Perdomo Cigars","href":"/shop/perdomo-cigars/1701413/?shop=Cigars"},"plasencia":{"name":"Plasencia Cigars","href":"/shop/plasencia-brand/2045046/?shop=Cigars"},"punch":{"name":"Punch Cigars","href":"/shop/punch-cigars/1701443/?shop=Cigars"},"ramon":{"name":"Ramon Bueso Cigars","href":"/shop/ramon-bueso-brand/1701447/?shop=Cigars"},"bueso":{"name":"Ramon Bueso Cigars","href":"/shop/ramon-bueso-brand/1701447/?shop=Cigars"},"rocky":{"name":"Rocky Patel Cigars","href":"/shop/rocky-patel-cigars-brand/1701456/?shop=Cigars"},"patel":{"name":"Rocky Patel Cigars","href":"/shop/rocky-patel-cigars-brand/1701456/?shop=Cigars"},"romeo":{"name":"Romeo y Julieta Cigars","href":"/shop/romeo-y-julieta-cigar-brand/1701458/?shop=Cigars"},"julieta":{"name":"Romeo y Julieta Cigars","href":"/shop/romeo-y-julieta-cigar-brand/1701458/?shop=Cigars"},"room101":{"name":"Room101 Cigars","href":"/shop/room-101-brand/1701459/?shop=Cigars"},"agio":{"name":"Royal Agio Cigars","href":"/shop/royal-agio-cigars/2026357/?shop=Cigars"},"cristobal":{"name":"San Cristobal Cigars","href":"/shop/san-cristobal-brand/1701465/?shop=Cigars"},"lotano":{"name":"San Lotano Cigars","href":"/shop/san-lotano-brand/1701466/?shop=Cigars"},"sancho":{"name":"Sancho Panza Cigars","href":"/shop/sancho-panza-brand/1701464/?shop=Cigars"},"panza":{"name":"Sancho Panza Cigars","href":"/shop/sancho-panza-brand/1701464/?shop=Cigars"},"southern":{"name":"Southern Draw Cigars","href":"/shop/southern-draw-cigars/2026353/?shop=Cigars"},"draw":{"name":"Southern Draw Cigars","href":"/shop/southern-draw-cigars/2026353/?shop=Cigars"},"tatuaje":{"name":"Tatuaje Cigars","href":"/shop/tatuaje-cigars-brand/1701510/?shop=Cigars"},"torano":{"name":"Torano Cigars","href":"/shop/torano-brand/1701089/?shop=Cigars"},"toscano":{"name":"Toscano Cigars","href":"/shop/toscano-cigars/2057238/?shop=Cigars"},"victor":{"name":"Victor Sinclair Cigars","href":"/shop/victor-sinclair-brand/1701532/?shop=Cigars"},"sinclair":{"name":"Victor Sinclair Cigars","href":"/shop/victor-sinclair-brand/1701532/?shop=Cigars"},"villiger":{"name":"Villiger Cigars","href":"/shop/villiger-brand/1701535/?shop=Cigars"},"warped":{"name":"Warped Cigars","href":"/shop/warped-brand/1702078/?shop=Cigars"}}
const wrapperDict = {"natural": {"name": "Natural"},"maduro": {"name": "Maduro"},"brazilian": {"name": "Brazilian"},"cameroon": {"name": "Cameroon"},"candela": {"name": "Candela"},"connecticut": {"name": "Connecticut"},"broadleaf": {"name": "Connecticut Broadleaf"},"connecticut habano": {"name": "Connecticut Habano"},"shade": {"name": "Connecticut Shade"},"corojo": {"name": "Corojo"},"criollo": {"name": "Criollo"},"dominican": {"name": "Dominican"},"ecuador": {"name": "Ecuador"},"habano": {"name": "Habano"},"honduran": {"name": "Honduran"},"indonesian": {"name": "Indonesian"},"nicaraguan": {"name": "Nicaraguan"},"pennsylvania": {"name": "Pennsylvania Broadleaf"},"andrés": {"name": "San Andrés"},"andres": {"name": "San Andrés"},"sumatra": {"name": "Sumatra"},"sun": {"name": "Sun Grown"},"usa": {"name": "USA Connecticut"}}


const getBrand = ((text, dictionary) => {
    text = text.toLowerCase()
    let words = text.split(' ')
    words = words.map(word => {
        word = word.replace(/[^a-zA-Z]+/g, '')
        if (dictionary[word]) {
            return dictionary[word].name
        } else {
            return ''
        }
    })
    words = [...new Set(words)]    
    words = words.filter(item => item !== '')
    return words
})
const getHref = ((text, dictionary) => {
    text = text.toLowerCase()
    let words = text.split(' ')
    words = words.map(word => {
        word = word.replace(/[^a-zA-Z]+/g, '')
        if (dictionary[word]) {
            return dictionary[word].href
        } else {
            return ''
        }
    })
    words = [...new Set(words)]    
    words = words.filter(item => item !== '')
    return words
})

export default function Home() {
    const [quizComplete, setQuizComplete] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const preferences = []
    const failedData = [{title: "Sorry, we're having server issues", text: "My deepest apologies for not being able to help you right now. Let me give you a few of my personal favorite cigars right now, and please try again later."}]

    const fetchRecommendations = async (preferences) => {
        try {
          const response = await fetch('https://us-west2-cigarbuddy.cloudfunctions.net/cigar-buddy-fetch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferences),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          let cleanData = parseResponse(result.message)
          cleanData.forEach((entry, i) => {
              let href = findCigarHref(entry.title)
              if (href) {
                  cleanData[i]["href"] = href
                  cleanData[i]["linkText"] = `Purchase ${entry.title} through an online retailer`
              }
              else {
                  let brand = getBrand(entry.title, brandsDict)
                  cleanData[i]["href"] = getHref(entry.title, brandsDict)[0]
                  cleanData[i]["linkText"] = `Explore ${brand} through an online retailer`                
              }
          })
          setRecommendations(cleanData)
        } catch (e) {
            console.log(e)
            setRecommendations(failedData)
        }
      };

    const onComplete = () => {
        setQuizComplete(true)
        // make request
        let response = fetchRecommendations(preferences)
    }

    return (
        <main style={{maxWidth: '1400px'}}>
            {/* <Results recommendations={recommendations}/> */}
            {quizComplete ? 
                recommendations.length ? <Results recommendations={recommendations}/> : <LoadingText/>
                : 
                <Quiz onComplete={onComplete} preferences={preferences}/>}
        </main>
    );
}  

function LoadingText() {
    return (
    <div className="results">
        <Image alt='' src={cigarBuddy.src}/>
        <div className="loading-text">
            Getting your results
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
        </div>
    </div>
    );
  };

function Results(props) {
    return <div className="results">
        <Image alt='' src={cigarBuddy.src}/>
        <div id="response">
            {props.recommendations.map((reco, i) => (
                <div key={reco.title ? reco.title : i} className='recommendation-card'>
                    <h3>{reco.title}</h3>
                    <p>{reco.text}</p>
                    <p><a href={'https://www.cigarsinternational.com'+reco.href}>{reco.linkText}    
                        <svg style={{verticalAlign: "text-bottom"}} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M12.25 3H9.5a.75.75 0 0 1 0-1.5h4.75a.75.75 0 0 1 .75.75V7a.75.75 0 0 1-1.5 0V4.25L7.03 10.72a.75.75 0 0 1-1.06-1.06L12.44 3H12.25zM3.5 4.75V12.5h7.75a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75v-8.5a.75.75 0 0 1 .75-.75H5a.75.75 0 0 1 0 1.5H3.5z"/>
                        </svg></a></p>
                </div>
            ))}
        </div>
    </div>
}

const QuestionSlider = ({ children, status }) => {
    return (
      <div className={`question-slider ${status}`}>
        {children}
      </div>
    );
  };
  
  

function Quiz(props) {
    const [answer, setAnswer] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([
        {question: "Is this your first cigar?", type: "y/n", id: "First"}, 
        // {question: "Is this for a special occasion?", type: "y/n", id: "Occasion"},
        // {question: "How long do you want to smoke?", type: "radio", id: "Size", options: [
        //     {value: "Under 30 minutes", label: "Under 30 minutes"},
        //     {value: "30 - 45 minutes", label: "30 - 45 minutes"},
        //     {value: "45 minutes - An hour", label: "45 minutes - An hour"},
        //     {value: "Over an hour", label: "Over an hour"}
        // ]}
        {question: "Do you have a price range?", type: "radio", id: "Price", options: [
            {value: "Up to $5", label: "Up to $5"},
            {value: "Up to $10", label: "Up to $10"},
            {value: "$10-$30", label: "$10-$30"},
            {value: "$30+", label: "$30+"},            
            {value: "No Preference", label: "No Preference"}
        ]}
    ]);
    const [animationState, setAnimationState] = useState('active');
    const beginnerQuestions = [
        {question: "What sorts of flavors do you generally enjoy? I'll recommend cigars with these aromatics.", id: "Aromatics", type: "checkbox", options: [
            {value: 'Coffee', label: 'Coffee'},
            {value: 'Chocolate', label: 'Chocolate'},
            {value: 'Fruit', label: 'Fruit'},
            {value: 'Floral', label: 'Floral'},
            {value: 'Vanilla', label: 'Vanilla'},
            {value: 'Caramel', label: 'Caramel'},
            {value: 'Pepper', label: 'Pepper'},
            {value: 'Nut', label: 'Nut'}            
        ]}
    ]
    const experiencedQuestions = [
        {question: "Do you have any favorite cigar brands?", id: "Brands", type: "text"},
        {question: "What are the best cigars you've ever had?", id: "Cigars", type: "text"},
        {question: "What aromatics do enjoy in your cigars?", id: "Aromatics", type: "checkbox", 
        options: [
            {value: 'Wood', label: 'Wood'},
            {value: 'Earth', label: 'Earth'},
            {value: 'Leather', label: 'Leather'},
            {value: 'Pepper', label: 'Pepper'},
            {value: 'Clove', label: 'Clove'},
            {value: 'Vanilla', label: 'Vanilla'},
            {value: 'Caramel', label: 'Caramel'},
            {value: 'Molasses', label: 'Molasses'},
            {value: 'Nut', label: 'Nut'},
            {value: 'Floral', label: 'Floral'},
            {value: 'Fruit', label: 'Fruit'},
            {value: 'Coffee', label: 'Coffee'},
            {value: 'Chocolate', label: 'Chocolate'}
        ]},
        {question: "Do you have wrapper type preferences? e.g., Natural, Maduro...", id: "Wrapper", type: "text"},
        {question: "What's your preference on cigar body/strength?", id: "Body", type: "radio", options: [
            {value: 'Mild', label: 'Mild'},
            {value: 'Medium', label: 'Medium'},
            {value: 'Full', label: 'Full-Bodied'},
        ]},
        {question: "Would you like me to tailor my recommendations toward any of these categories?", id: "Tailor", type: "radio", options: [
            {value: "Summer Cigar", label: "Summer Cigar"},
            {value: "Special Occasion", label: "Special Occasion"},
            {value: "Highly Rated", label: "Highly Rated"},
            {value: "Less Common Brands", label: "Less Common Brands"},
            {value: "No preference", label: "No preference"}
        ]}
    ];
    const responseDict = {
        "First": "First cigar: ",
        "Occasion": "Special Occasion: ",
        "Price": "Price range: ",
        "Aromatics": "Desired Aromatics: ",
        "Brands": "Favorite Brands: ",
        "Cigars": "Favorite Cigars: ",
        "Wrapper": "Preferred Wrapper(s): ",
        "Body": "Preferred Body/Fullness: ",
        "Tailor": "Tailor results toward: "
      }
    const processText = ((text, dictionary) => {
        text = text.toLowerCase()
        let words = text.split(' ')
        words = words.map(word => {
            word = word.replace(/[^a-zA-Z]+/g, '')
            if (dictionary[word]) {
                return dictionary[word].name
            } else {
                return ''
            }
        })
        words = words.filter(item => item !== '')
        words = [...new Set(words)]
        words = words.join(', ')
        return words
    })

    const nextQuestion = () => {
        setAnimationState('exiting');
        if (currentQuestionIndex + 1 >= questions.length) {
            props.onComplete()
        } else {
            setTimeout(() => {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setAnswer('');
                setAnimationState('entering');  
            }, 250); // This should match the transition duration in CSS
        }
    }
    
      const handleSubmit = (e, form) => {
        e.preventDefault();
        // make sure there is a valid entry
        if (questions[currentQuestionIndex].type === 'text') {
            if (answer === '') return
        }

        let response = responseDict[questions[currentQuestionIndex].id]
        if (questions[currentQuestionIndex].type === 'text') {
            let textResponse = ` ${answer.substr(0, 300)}`            
            if (questions[currentQuestionIndex].id === 'Brands') {
                textResponse = processText(textResponse, brandsDict)
            } else if (questions[currentQuestionIndex].id === 'Wrapper') {
                textResponse = processText(textResponse, wrapperDict)                
            } else if (questions[currentQuestionIndex].id === 'Cigars') {
                textResponse = checkCigarInput(textResponse).join(', ')
            }
            response += textResponse
        } else if (questions[currentQuestionIndex].type === 'checkbox') {
            if (e.target) {
                let checkboxes = [...e.target]
                checkboxes.forEach(checkbox => {
                    response += checkbox.checked ? `${checkbox.name}, ` : ''
                })
            }
        } else if (questions[currentQuestionIndex].type === 'radio') {
            if (e.target) {
                let radios = [...e.target]
                radios.forEach(radio => {
                    response += radio.checked ? `${radio.value}` : ''
                })
            }
        } else if (questions[currentQuestionIndex].type === 'y/n') {
            response += `${form}`            
        }
        props.preferences.push(response)
        nextQuestion()
      };

      useEffect(() => {
        if (animationState === 'entering') {
          const timer = setTimeout(() => setAnimationState('active'), 50);
          return () => clearTimeout(timer);
        }
      }, [animationState]);
        

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSubmit(e);
        }
      };

      const handleYesOrNo = (e, response) => {
          if (currentQuestionIndex === 0) {
            setQuestions(questions => response === 'yes' ? [...questions, ...beginnerQuestions] : [...questions, ...experiencedQuestions])        
          }
          handleSubmit(e, response)        
      };
    
      return (
        <div style={{padding: '100px', color: '#935F2A', position: 'relative', maxWidth: '80%'}}>
          <QuestionSlider status={animationState}>
            <h3 className={currentQuestionIndex === 0 ? "fade-in-2000 question center":"question"}>{questions[currentQuestionIndex].question}</h3>
            {questions[currentQuestionIndex].type === 'text' ? 
            <TextForm answer={answer} setAnswer={setAnswer} handleKeyDown={handleKeyDown} onSubmit={handleSubmit}/> : ''}
            {questions[currentQuestionIndex].type === 'checkbox' ? 
            <CheckboxForm options={questions[currentQuestionIndex].options} onSubmit={handleSubmit} /> :''}
            {questions[currentQuestionIndex].type === 'radio' ? 
            <RadioForm options={questions[currentQuestionIndex].options} onSubmit={handleSubmit} /> :''}
            {questions[currentQuestionIndex].type === 'y/n' ? 
            <YesNoButtons idx={currentQuestionIndex} onYes={(e) => handleYesOrNo(e, 'yes')} onNo={(e) => handleYesOrNo(e, 'no')}/> :''}
          </QuestionSlider>
        </div>
      );
}

function TextForm({answer, setAnswer, handleKeyDown, onSubmit}) {
    return(
        <form onSubmit={onSubmit} className="answer-wrapper">
            <input 
            className="answer" 
            id="answer" 
            type="text" 
            value={answer} 
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={'Your Answer'}
            autoComplete="off"
            />
            <label className="text-label" htmlFor="answer">Your answer: </label>
            <button type="submit" aria-label="Submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12L20 12" stroke="#935F2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 6L20 12L14 18" stroke="#935F2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </form>
    )

}

function CheckboxForm({ options, onSubmit }) {
    const [checkboxes, setCheckboxes] = useState(
        options.reduce((acc, option) => ({ ...acc, [option.value]: false }), {})
    );
    const handleCheckboxChange = (event) => {
        setCheckboxes({
        ...checkboxes,
        [event.target.name]: event.target.checked
        });
    };
    
      return (
        <form onSubmit={onSubmit} className="checkbox-form">
            <div className={`checkbox-container ${options.length > 6 ? 'two-columns' : ''}`}>
                {options.map((option) => (
                <div key={option.value} className="checkbox-option">
                    <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name={option.value}
                        checked={checkboxes[option.value]}
                        onChange={handleCheckboxChange}
                        className="checkbox-input"
                    />
                    {option.label}
                    </label>
                </div>
                ))}
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
      );
}

function RadioForm({ options, onSubmit }) {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleRadioChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <form onSubmit={onSubmit} className="radio-form">
        <div className={`radio-container ${options.length > 6 ? 'two-columns' : ''}`}>
          {options.map((option) => (
            <div key={option.value} className="radio-option">
              <label className="radio-label">
                <input
                  type="radio"
                  name="radioGroup"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={handleRadioChange}
                  className="radio-input"
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    );
  } 

function YesNoButtons({ onYes, onNo, idx }) {
    return (<div>
        <div className={idx === 0 ? "fade-in-2000 yes-no-container" :"yes-no-container"}>
            <button className="yes-button" onClick={onYes}>Yes</button>
            <button className="no-button" onClick={onNo}>No</button>
        </div>
        {idx === 0 ? <div className="image-container">
            <Image src={cigarBuddyLogo.src} alt="Animated Cigar Buddy" className="animated-image"/>
        </div> : ``}
        {idx === 0 ? <h3 className="fade-in-1000 center">Howdy! I&apos;m cigar buddy. I&apos;m here to help you pick your next cigar.</h3> : ''}
    
        </div>
    );
}

