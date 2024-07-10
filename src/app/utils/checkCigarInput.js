function improvedLevenshteinDistance(a, b) {
    const matrix = [];
    
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
    
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
    
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
    return matrix[b.length][a.length];
    }

function calculateSimilarity(a, b) {
    const distance = improvedLevenshteinDistance(a, b);
    const maxLength = Math.max(a.length, b.length);
    return (maxLength - distance) / maxLength;
}

function findStrictMatches(entry, preprocessedItems, maxResults = 3) {
    const normalizedEntry = entry.toLowerCase().replace(/\s+/g, ' ').trim();
    const words = normalizedEntry.split(' ');
    const matches = [];

    for (const item of preprocessedItems) {
        const itemWords = item.split(' ');
        let score = 0;

        for (const word of words) {
            for (const itemWord of itemWords) {
                if (itemWord.startsWith(word) || word.startsWith(itemWord)) {
                    score += 0.5;
                }

                const similarity = calculateSimilarity(word, itemWord);
                if (similarity > 0.8) {
                    score += similarity;
                }
            }
        }

        const lengthDiff = Math.abs(normalizedEntry.length - item.length) / Math.max(normalizedEntry.length, item.length);
        if (lengthDiff < 0.2) {
            score += 1;
        }

        if (score > 1) {
            matches.push({ item, score });
        }
    }

    return matches
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults)
        .map(match => match.item);
}

function processMultipleEntries(input, preprocessedItems, maxResultsPerEntry = 3, maxTotalResults = 10) {
    // Split the input into potential entries
    const entries = input.split(',').map(entry => entry.trim()).filter(entry => entry.length > 0);
    
    let topMatches = [];

    for (const entry of entries) {
        const matches = findStrictMatches(entry, preprocessedItems, maxResultsPerEntry);
        let allMatches = matches.map(item => ({ item, entry }));
    

    // Remove duplicates, keeping the first occurrence
    const uniqueMatches = Array.from(new Map(allMatches.map(match => [match.item, match])).values());

    // Sort by the length of the matched entry (assuming longer matches are more specific)
    uniqueMatches.sort((a, b) => b.entry.length - a.entry.length);
    topMatches.push(uniqueMatches[0]['item'])
    }

    // Return the top results
    return topMatches
}

// Usage
export default function checkCigarInput(input) {
    const itemNames = ["1876 Reserve","1876 Reserve Maduro","5 Vegas Big Five","5 Vegas Big Five Brazil","5 Vegas Cask-Strength","5 Vegas Classic","5 Vegas Gold","5 Vegas Gold Anniversary","5 Vegas Nicaragua","5 Vegas Petites","5 Vegas Series A","5 Vegas Triple-A","601 Blue Maduro","601 Green Oscuro","601 Red Habano","ACID 20 by Drew Estate","ACID 20 Connecticut","ACID Blondie Cigars by Drew Estate","ACID Cigars by Drew Estate","ACID Cigars by Drew Estate Opulence 3","ACID Kuba Kuba Cigars by Drew Estate","ACID Ltd. by Drew Estate Def Sea","Aganorsa Leaf Aniversario","Aganorsa Leaf Aniversario Maduro","Aganorsa Leaf Anniversario Connecticut","Aganorsa Leaf La Validacion Connecticut","Aganorsa Leaf La Validacion Corojo","Aganorsa Leaf La Validacion Habano","Aganorsa Leaf La Validacion Maduro","Aganorsa Leaf Signature Selection","Aganorsa Overruns","Aganorsa Rare Leaf","Aganorsa Rare Leaf Maduro","Aganorsa Signature Maduro","Aging Room Pura Cepa","Aging Room Quattro Connecticut","Aging Room Quattro Maduro","Aging Room Quattro Nicaragua","Aging Room Quattro Nicaragua Sonata","Aging Room Quattro Original","AJ Fernandez Bellas Artes","AJ Fernandez Bellas Artes Maduro","AJ Fernandez Dias de Gloria","AJ Fernandez Dias de Gloria Brazil","AJ Fernandez Enclave","AJ Fernandez Enclave Broadleaf","AJ Fernandez La Gran Llave Connecticut","AJ Fernandez Last Call","AJ Fernandez Last Call Maduro","AJ Fernandez New World","AJ Fernandez New World Cameroon","AJ Fernandez New World Connecticut","AJ Fernandez New World Dorado","AJ Fernandez New World Puro Especial","AJ Fernandez Ramon Allones","AJ Fernandez Ramon Allones Special Selection","AJ Fernandez Rosa de Guadalupe","AJ Fernandez San Lotano Oval","AJ Fernandez San Lotano Oval Connecticut","AJ Fernandez San Lotano Oval Maduro","AJ Fernandez San Lotano Requiem","AJ Fernandez San Lotano Requiem Connecticut","AJ Fernandez San Lotano Requiem Maduro","Al Capone","Aladino Cameroon","Aladino Connecticut","Aladino Corojo","Aladino Corojo Reserva","Aladino Maduro","Aladino Vintage","Alec & Bradley Blind Faith","Alec & Bradley Gatekeeper","Alec & Bradley Kintsugi","Alec Bradley American Classic Blend","Alec Bradley American Sun Grown","Alec Bradley Black Market","Alec Bradley Black Market Esteli","Alec Bradley Black Market Illicit","Alec Bradley Black Market Vandal","Alec Bradley Black Market Vandal The Con","Alec Bradley Boy/Girl","Alec Bradley Caribbean Cask","Alec Bradley Cazadores","Alec Bradley Connecticut","Alec Bradley Coyol","Alec Bradley Double Broadleaf","Alec Bradley Filthy Hooligan 2024","Alec Bradley Filthy Hooligan Shamrock 2024","Alec Bradley Magic Toast","Alec Bradley MAXX","Alec Bradley Medalist","Alec Bradley Post Embargo Blend Code B15","Alec Bradley Prensado","Alec Bradley Prensado Fumas","Alec Bradley Prensado Lost Art","Alec Bradley Project 40","Alec Bradley Project 40 Maduro","Alec Bradley Puck","Alec Bradley Select Connecticut","Alec Bradley Select Corojo","Alec Bradley Select Maduro","Alec Bradley Superstition","Alec Bradley Tempus","Alec Bradley Tempus Fumas","Alec Bradley Tempus Maduro","Alec Bradley Tempus Nicaragua","Alec Bradley Texas Lancero","Alec Bradley The Lineage","Alec Bradley Trilogy","Alec Bradley V2L Black","Alec Bradley White Gold","Alta Gracia","Arganese Connecticut","Arganese Habano","Arganese Il Mezzo","Arganese Maduro","Arturo Fuente Chateau Fuente Series","Arturo Fuente Chateau Fuente Series Sun Grown","Arturo Fuente Don Carlos","Arturo Fuente Gran Reserva","Arturo Fuente Hemingway","Arturo Fuente Hemingway Short Story","Ashton","Ashton Aged Maduro","Ashton Cabinet Selection","Ashton ESG","Ashton Heritage Puro Sol","Ashton Small Cigars","Ashton Symmetry","Ashton VSG","Astral Talanga Valley Selection Cigars","Asylum","Asylum 13","Asylum 13 Authentic Corojo","Asylum 13 Connecticut","Asylum 13 Medulla","Asylum 13 Medulla Maduro","Asylum 13 Oblongata","Asylum 13 Oblongata Maduro","Asylum 13 Ogre","Asylum Insidious","Asylum Insidious Maduro","Asylum Nyctophilia","Avanti","Avanti Ramrod","Ave Maria","Ave Maria Argentum","Ave Maria Dark Knight","Ave Maria Divinia","Ave Maria Holy Grail","Ave Maria Immaculata","Ave Maria Lionheart","Ave Maria Reconquista","AVO Classic","AVO Classic Maduro","AVO Heritage","AVO Syncro Caribe","AVO Syncro Nicaragua","AVO Syncro Nicaragua Fogata","AVO Syncro South America Ritmo","AVO XO","Baccarat","Baccarat Candela","Baccarat Nicaragua","Backwoods","Bahia Blu","Bahia Brazil","Bahia Cafe","Bahia Connecticut Deluxe","Bahia Maduro","Bahia Trinidad","Bandidos","Bandidos Black","Bandidos Blue Cigarillos","Bandidos Honey Berry","Bandidos Russian Cream","Big Papi by David Ortiz","Black & Mild","Black & Mild Wine","Black & Mild Wood Tip","Black Crown","Black Label Trading Co. Last Rites","Black Label Trading Co. Lawless","Black Label Trading Co. Memento Mori","Black Label Trading Co. Porcelain","Black Label Trading Co. Royalty","Black Label Trading Co. Salvation","Black Ops Connecticut Toro","Black Works Studio Green Hornet","Black Works Studio Hyena","Black Works Studio Killer Bee","Blackstone Cigars","Blue Label B2 Cuban Wheels","Bolivar","Bolivar Cofradia","Bolivar Gran Republica","Brazilian Cream","Brick House","Brick House Connecticut","Brick House Fumas","Brick House Fumas Connecticut","Brick House Fumas Maduro","Brick House Maduro","Brioso Bundles","Brocatus","Buffalo Trace Cigars","Buffalo Trace Explorers","Cain by Oliva","Cain Daytona by Oliva","Cain F Nub by Oliva","Cain Nub by Oliva","Caldwell Anastasia","Caldwell Collection - E.S. Midnight Express","Caldwell Collection - Long Live The King","Caldwell Collection - The King Is Dead","Caldwell Delano","Caldwell Eastern Standard","Caldwell Eastern Standard Habano","Caldwell Essex","Caldwell Long Live the King Limited Bar-None","Caldwell Long Live the King Mad MoFo","Caldwell Long Live the Queen","Caldwell Lost and Found 22 Minutes to Midnight Connecticut Radiante","Caldwell Lost and Found 22 Minutes to Midnight Habano De Oro","Caldwell Lost and Found Cream Machine","Caldwell Lost and Found Instant Classic San Andres","Caldwell Lost and Found La Whatever","Caldwell Lost and Found PCS Broadleaf Box Press","Caldwell Louis The Last","Caldwell Montrose","Caldwell The Industrialist","Caldwell The Last Tsar","Camacho Broadleaf","Camacho Connecticut","Camacho Corojo","Camacho Coyolar","Camacho Ecuador","Camacho Factory Unleashed 3","Camacho Nicaragua","Camacho Pre-Embargo","Camacho Scorpion Fumas Connecticut","Camacho Scorpion Fumas Sun Grown","Camacho Scorpion Sun Grown","Camacho Triple Maduro","CAO America","CAO Arcana Firewalker","CAO Black","CAO Bones","CAO Brazilia","CAO BX3","CAO Colombia","CAO Consigliere","CAO Extreme","CAO Flathead","CAO Flathead Steel Horse","CAO Flathead V23","CAO Flavours","CAO Flavours Bella Vanilla","CAO Flavours Cherrybomb","CAO Flavours Gold Honey","CAO Flavours Moontrance","CAO Gold","CAO Gold Maduro","CAO Italia","CAO Mortal Coil","CAO Mx2","CAO Nicaragua","CAO Pilon","CAO Pilon Anejo","CAO Session","CAO Zocalo","Casa de Garcia","Casa de Garcia Nicaragua","Casa Fernandez Miami","Casa Fernandez Miami Reserva","Casa Fernandez Miami Reserva Maduro","Casa Magna Colorado","Casa Magna Connecticut","Cavalier Geneve Limited Edition 2022","Chavon Connecticut Toro","Churchill Deluxe by Caribe","CI Fresh-Rolled Cedar Fresh","CI Fresh-Rolled Cuban Wheels","CI Fresh-Rolled Rosado Cuban Wheels","CI Knock-Offs - Coffee","CI Knock-offs - Coffee: Irish Cream","CI Knock-Offs - Compare to Cohiba","CI Knock-Offs - Compare to La Gloria","CI Knock-Offs - Compare to Macanudo","CI Knock-Offs - Compare to Montecristo","CI Knock-Offs - Compare to Partagas","CI Knock-Offs - Compare to Romeo y Julieta","CI Knock-Offs - Compare to White Label","CI Legends by Drew Estate","CI Legends by Drew Estate Black","Cibao Connecticut","Cibao Maduro","CLE Chele","CLE Connecticut","CLE Prieto","Cohiba Black","Cohiba Blue","Cohiba Connecticut","Cohiba Macassar","Cohiba Nicaragua","Cohiba Pequenos","Cohiba Puro Dominicana","Cohiba Red Dot","Cohiba Riviera","Cohiba Royale","Coopera Habano by Hirochi Robaina","Crowned Heads Azul y Oro","Crowned Heads Four Kicks","Crowned Heads Four Kicks Capa Especial","Crowned Heads Four Kicks Maduro","Crowned Heads Four Kicks Mule Kick LE 2023","Crowned Heads J Juarez","Crowned Heads J.D. Howard Reserve","Crowned Heads Jericho Hill","Crowned Heads La Imperiosa","Crowned Heads Las Calaveras Edicion Limitada 2023","Crowned Heads Le Careme","Crowned Heads Le Patissier","Crowned Heads Mil Dias","Crowned Heads Mil Dias Marranitos Edición Limitada 2023","Cu-Avana Punisher","Cuba Aliados Original Blend","Cuba Libre","Cuba Libre One","Cuban Classics Doble Capa","Cuban Delights","Cuban Honeys","Cuban Honeys Stingers Cigarillos","Cuban Rounds Connecticut","Cuban Rounds Maduro","Cuban Rounds Natural","Cuesta-Rey Centenario","Cuesta-Rey Centro Fino","Cusano 18 Natural and Maduro","Daniel Marshall Gold Torpedo 2012","Daniel Marshall Red Label","Dark Shark","Davidoff Aniversario Series","Davidoff Anniversario No. 1 LE 2023","Davidoff Cigarillos","Davidoff Colorado Claro","Davidoff Escurio","Davidoff Grand Cru","Davidoff Millennium","Davidoff Nicaragua","Davidoff Primeros","Davidoff Royal","Davidoff Signature Series","Davidoff Special Series","Davidoff Winston Churchill","Davidoff Winston Churchill The Late Hour","Davidoff Yamasa","De Nobili by Avanti","Diamond Crown","Diamond Crown Julius Caeser","Diamond Crown Maximus","Diesel","Diesel d.10th","Diesel Disciple","Diesel Esteli Puro","Diesel Heart of Darkness","Diesel Rage","Diesel Uncut","Diesel Uncut d.CT","Diesel Unlimited","Diesel Unlimited Maduro","Diesel Vintage Series Maduro","Diesel Vintage Series Natural","Diesel Whiskey Row","Diesel Whiskey Row Sherry Cask","Diesel Wicked","Djarum Bali Hai","Djarum Black","Djarum Black Emerald","Djarum Black Ivory","Djarum Black Ruby","Djarum Black Sapphire","Djarum Black Silver","Djarum Select","Djarum Special","Djarum Splash","Dominican Cream","Don Diego","Don Felix",
    "Don Jesus","Don Lino Africa","Don Lino Habanitos","Don Pepin Garcia Blue","Don Pepin Garcia Cuban Classic","Don Pepin Garcia Series JJ","Don Pepin Garcia Vegas Cubanas","Don Rafael Connecticut","Don Rafael Gold","Don Rafael Maduro","Don Rafael Nicaragua","Don Rafael Signature","Don Reynaldo by Warped","Don Smith","Don Tomas Clasico Maduro","Don Tomas Clasico Natural","Don Tomas Sungrown","Double Happiness Cazadores","Drew Estate 20 Acre Farm","Drew Estate Blackened M81","Drew Estate Blackened S84 Shade to Black","Drew Estate Chateau Real Connecticut Shade","Drew Estate Deadwood Girl With No Name","Drew Estate Deadwood Tobacco Co.","Drew Estate Deadwood Tobacco Crazy Alice","Drew Estate Deadwood Tobacco Fat Bottom Betty","Drew Estate Deadwood Tobacco Leather Rose","Drew Estate Factory Smokes Cigarillos","Drew Estate Factory Smokes Connecticut Shade","Drew Estate Factory Smokes Maduro","Drew Estate Factory Smokes Sun Grown","Drew Estate Factory Smokes Sweets","Drew Estate Herrera Esteli Brazilian Maduro","Drew Estate Herrera Esteli Habano","Drew Estate Herrera Esteli Miami","Drew Estate Herrera Esteli Norteno","Drew Estate Isla del Sol","Drew Estate Isla del Sol Maduro","Drew Estate Kentucky Fire Cured Swamp Rat & Swamp Thang","Drew Estate Liga Privada Aniversario 10","Drew Estate Liga Privada H99","Drew Estate Liga Privada No. 9","Drew Estate Liga Privada T52","Drew Estate Liga Privada Unico Series","Drew Estate MUWAT Kentucky Fire Cured","Drew Estate MUWAT Kentucky Fire Cured Sweets","Drew Estate Nica Rustica Broadleaf","Drew Estate Tabak Especial","Drew Estate Tabak Especial Limited Red Eye","Drew Estate Tabak Especial Ltd. Cafe Con Leche","Drew Estate Undercrown 10","Drew Estate Undercrown Maduro","Drew Estate Undercrown Shade","Drew Estate Undercrown Sun Grown","Dunbarton Mi Querida","Dunbarton Mi Querida Black","Dunbarton Mi Querida Triqui Traca","Dunbarton Muestra de Saka Exclusivo","Dunbarton Muestra de Saka Krakatoa","Dunbarton Muestra de Saka Nacatamale","Dunbarton Muestra de Saka The Bewitched","Dunbarton Muestra de Saka Unicorn","Dunbarton Muestra de Saka Unstolen Valor","Dunbarton Red Meat Lovers","Dunbarton Sin Compromiso","Dunbarton Sobremesa","Dunbarton Sobremesa Brulee","Dunbarton Stillwell Star","Dunbarton Stillwell Star Holiday 2023","Dunbarton Umbagog","Duque","Dutch by Dutch Masters","Dutch Masters","E.H. Taylor Cigars","E.P. Carillo Short Run 2023","E.P. Carrillo Allegiance","E.P. Carrillo Encore","E.P. Carrillo INCH Maduro","E.P. Carrillo INCH Natural","E.P. Carrillo Inch Nicaragua","E.P. Carrillo La Historia","E.P. Carrillo New Wave","E.P. Carrillo Pledge","Eagle Rare Special Release","Edition One Cloud Hopper","Eiroa by Christian Eiroa","Eiroa CBT Maduro","Eiroa Jamastran","Eiroa the First 20 Years","Eiroa: The First 20 Years Colorado","El Baton","El Duque Cognac","El Mejor Espresso","El Rey Del Mundo","El Rey del Mundo Naturals","El Rey del Mundo Shade Grown","El Rico Habano","Emilio Audiophile","Emilio Cavatina","Emilio Grimalkin","Emilio Side 1","Emilio Side 2","Emilio Suave","Epic Corojo Double Corona","Erin Go Bragh","Erin Go Bragh Cigarillos","Escudo Cubano Maduro","Espinosa Comfortably Numb Vol. 1","Espinosa Comfortably Numb Vol. 2","Espinosa Comfortably Numb Vol. 3","Espinosa Crema","Espinosa Habano","Espinosa Knuckle Sandwich Connecticut","Espinosa Knuckle Sandwich Habano","Espinosa Knuckle Sandwich Maduro","Espinosa Laranja Reserva","Espinosa Laranja Reserva Azulejo","Espinosa Laranja Reserva Escuro","Espinosa Las 6 Provincias CMW","Espinosa Las 6 Provincias ZDT","Espinosa Murcielago","Evelio","Factory Smokes by DE Candela","Factory Throwouts","Ferio Tego Metropolitan Connecticut","Ferio Tego Metropolitan Host","Ferio Tego Metropolitan Host Maduro","Ferio Tego Timeless Supreme Cigars","Fields of Gold","Fighting Cock","Fireball Cinnamon Cigars","Flor de las Antillas Maduro","Flor de Oliva Gold","Flor de Oliva Maduro","Flor del Todo","FLVR Cigars","Foundation Aksum","Foundation Aksum Maduro","Foundation Charter Oak","Foundation Charter Oak Habano","Foundation El Gueguense","Foundation Highclere Castle","Foundation Highclere Castle Victorian","Foundation Olmec Maduro and Claro","Foundation The Tabernacle","Foundation The Tabernacle Havana Seed CT #142","Foundation The Tabernacle Knight Commander","Foundation The Wise Man Maduro","Fratello Arlequin","Fratello Arlequin Connecticut","Fratello Classico","Fratello Navetta","Fratello Oro","Fratello Sorella","Free Cuba","Frontier Cheroots Cigarillos","Fuente Fuente OpusX Lost City","Game Cigars by Garcia y Vega","Game Leaf by Garcia y Vega","Garcia y Vega Cigars","General Grant","Gilberto Oliva Reserva","Gilberto Oliva Reserva Blanc","Gilberto Oliva Reserva Noir","Gispert","God of Fire by Carlito","God of Fire by Don Carlos","God of Fire Serie Aniversario","God of Fire Serie B","Good Times Black Tipped Cigarillos","Good Times Cigarillos","Good Times Country Man","Good Times Sweet Woods","Gran Habano #1 Connecticut","Gran Habano #3 Habano","Gran Habano #5 Corojo","Gran Habano #5 Corojo Maduro","Gran Habano Minis","Gran Habano Vintage Connecticut 2004","Gran Habano Vintage Corojo 2002","Gran Habano Vintage Habano 2006","Graycliff 10 Year Vintage Maduro","Graycliff 1666","Graycliff Double Espresso Series","Graycliff G2","Graycliff G2 Habano","Graycliff G2 Maduro","Graycliff Profesionale Series","Graycliff Turbo Edicion Limitada","Graycliff West Hill St","Guardian of the Farm","Guardian of the Farm Cerberus","Guardian of the Farm Nightwatch","Gurkha 125th Anniversary","Gurkha Archive","Gurkha Beast","Gurkha Beauty","Gurkha Black Dragon","Gurkha Black Ops Connecticut","Gurkha Black Ops Habano","Gurkha Black Ops Maduro","Gurkha Bourbon Collection","Gurkha Cellar Reserve","Gurkha Cellar Reserve Edicion Especial","Gurkha Cellar Reserve Limitada","Gurkha Centurian Double Perfecto","Gurkha Class Regent","Gurkha Classic Havana","Gurkha Crest","Gurkha Evil","Gurkha Ghost","Gurkha Ghost Gold","Gurkha Grand Age","Gurkha Grand Reserve","Gurkha Hudson Bay","Gurkha Legend Vintage 2001","Gurkha Master Select","Gurkha Nicaragua Series","Gurkha Omen","Gurkha Park Avenue","Gurkha Park Avenue Habano","Gurkha Park Avenue Maduro","Gurkha Private Reserve","Gurkha Prize Fighter","Gurkha Sherpa Black","Gurkha Sherpa Orange","Gurkha Signature 1887","Gurkha Status","Gurkha Symphony","Gurkha The Royal Reserve","Gurkha Titan","Gurkha Wicked Indie","Gurkha Widow Maker","Gurkha Yakuza","H. Upmann 1844 Anejo","H. Upmann 1844 Classic","H. Upmann 1844 Reserve","H. Upmann 1884 Special Edition Barbier","H. Upmann Banker Day Trader","H. Upmann by AJ Fernandez","H. Upmann Connecticut","H. Upmann Nicaragua AJ Fernandez Heritage","H. Upmann The Banker","Habano Primero Maduro","Habano Primero Natural","Havana Classico","Havana Cream","Havana Q by Quorum","Hav-A-Tampa Jewels","Hazelnut Raffinato","HC Series Black Maduro","HC Series Blue Barber Pole","HC Series Connecticut","HC Series Criollo","HC Series Habano Colorado","HC Series Red Corojo","HC Series White Shade Grown","Helix","Henry Clay","Henry Clay War Hawk","Hesitant Pirate","Honey Delights Cigarillos","Hoyo Dark Sumatra","Hoyo de Monterrey","Hoyo de Monterrey Epicure Seleccion","Hoyo De Monterrey Excalibur","Hoyo De Monterrey Excalibur Black","Hoyo De Monterrey Excalibur Black Cigarillos","Hoyo De Monterrey Excalibur Cameroon","Hoyo de Monterrey Excalibur Cigarillos","Hoyo De Monterrey Excalibur Dark Knight","Hoyo de Tradicion","Hoyo La Amistad Black","Hoyo La Amistad Dark Sumatra","Hoyo La Amistad Gold","HVC 10th anniversary","HVC 500th Anniversary","HVC Black Friday 2023","HVC Cerro Natural","HVC Edicion Especial 2015","HVC Hot Cake Golden Line","HVC Hot Cakes","HVC Pan Caliente","Illusione Candela","Illusione Cigares Prive Corojo","Illusione Cigars Prive SA Maduro","Illusione Cruzado","Illusione ECCJ","Illusione Epernay Serie 2009","Illusione Epernay Serie 2009 10th Anniversary","Illusione Garagiste","Illusione Gigantes","Illusione Haut 10","Illusione Maduro","Illusione OneOff","Illusione Original Documents","Illusione Rothchildes","Illusione Singulare","Illusione Slam Bench Pressed","Illusione Ultra","INCH RingMaster by E.P. Carrillo","Island Jim by Oscar #2","Jaime Garcia Reserva Especial","Java by Drew Estate","Java Mint by Drew Estate","Java Red by Drew Estate","JFR Lunatic Corojo Torch","JFR Lunatic Habano","JFR Lunatic Loco","JFR Lunatic Maduro","JFR XT Corojo","JFR XT Maduro","John Bull","Joya de Nicaragua Antano 1970","Joya de Nicaragua Antano Connecticut","Joya de Nicaragua Antano Dark Corojo","Joya de Nicaragua Antano Gran Reserva","Joya de Nicaragua Black","Joya de Nicaragua Cabinetta","Joya De Nicaragua Cinco de Cinco","Joya de Nicaragua Cuatro Cinco","Joya de Nicaragua JOYA Red","Joya de Nicaragua Numero Uno","Joya de Nicaragua Silver","Joya del Jefe 2-Fer","Judge Wright by JC Newman","Kentucky Cheroots","Kristoff Connecticut","Kristoff Criollo","Kristoff GC Signature Series","Kristoff Kristania","Kristoff Kristania Maduro","Kristoff Ligero Maduro","Kristoff Maduro","Kristoff San Andres","Kristoff Sumatra","Kristoff Tres Compadres","La Aroma de Cuba","La Aroma de Cuba Connecticut","La Aroma de Cuba Edicion Especial","La Aroma de Cuba Mi Amor","La Aroma de Cuba Noblesse","La Aroma de Cuba Pasion","La Aroma de Cuba Reserva","La Aurora 107","La Aurora 107 Maduro","La Aurora 107 Nicaragua","La Aurora 1495 Series","La Aurora 1987 Connecticut","La Aurora Preferidos Diamond","La Aurora Preferidos Emerald","La Aurora Preferidos Gold","La Aurora Preferidos Platinum","La Aurora Preferidos Ruby","La Aurora Preferidos Sapphire","La Aurora Principes","La Barba Purple","La Barba Red","La Barba Ricochet","La Barba Ricochet Cru Mexi-Sol","La Caya Habano II Maduro Robusto","La Diferencia Cubana","La Estrella Cubana Connecticut","La Estrella Cubana Habano","La Flor Dominicana 1994","La Flor Dominicana Air Bender","La Flor Dominicana Andalusian Bull","La Flor Dominicana Cameroon Cabinet","La Flor Dominicana Coronado",
    "La Flor Dominicana Double Claro","La Flor Dominicana Double Ligero","La Flor Dominicana Double Ligero Maduro","La Flor Dominicana La Volcada","La Flor Dominicana Ligero","La Flor Dominicana Ligero Cabinet","La Flor Dominicana Reserva Especial","La Galera 1936 Box Pressed","La Galera Habano","La Galera Maduro","La Gloria Cubana","La Gloria Cubana Esteli","La Gloria Cubana Medio Tiempo","La Gloria Cubana Serie R","La Gloria Cubana Serie R Black","La Gloria Cubana Serie R Black Maduro","La Gloria Cubana Serie R Esteli","La Gloria Cubana Serie R Esteli Maduro","La Gloria Cubana Serie S","La Gloria Cubana Serie S Maduro","La Gloria Cubana Spanish Press","La Herencia Cubana","La Herencia Cubana CORE","La Herencia Cubana Dorado","La Herencia Cubana Oscuro Fuerte","La Palina 125 Anos","La Palina 1948","La Palina Black Label","La Palina Blue Label","La Palina Bronze Label","La Palina Classic Connecticut","La Palina Classic Maduro","La Palina Classic Natural","La Palina Classic Rosado","La Palina El Diario","La Palina Fuego Verde","La Palina Goldie","La Palina KB Series","La Palina Maduro","La Palina Nicaragua Connecticut","La Palina Nicaragua Oscuro","La Palina Red Label","La Palina White Label","La Perla Habana 1515","La Perla Habana Black & Tan","La Perla Habana Black Pearl Morado","La Perla Habana Black Pearl Original","La Perla Habana Black Pearl Oro","La Perla Habana Black Pearl Rojo","La Perla Habana Cazadores","La Perla Habana Cazadores Connecticut","La Perla Habana Classic","La Perla Habana Classic Cameroon","La Perla Habana Classic Maduro","La Perla Habana White Pearl","La Perla Habana WIDE","La Unica","Latitude Zero","Latitude Zero Los Rios","Latitude Zero Signature","Leaf By Oscar 10th Anniversary Criollo","Leaf by Oscar Connecticut","Leaf by Oscar Corojo","Leaf by Oscar Maduro","Leaf by Oscar Sumatra","League of Fat Bastards Serie L","Los Statos Deluxe","Los Statos Deluxe Maduro","Lotus Meteor V Cutter","M by Macanudo Bourbon","M by Macanudo Coffee","M by Macanudo Espresso","Macanudo 1968","Macanudo Ascots","Macanudo Cafe","Macanudo Cru Royale","Macanudo Gold Label","Macanudo Inspirado Black","Macanudo Inspirado Green","Macanudo Inspirado Orange","Macanudo Inspirado Red","Macanudo Inspirado White","Macanudo Maduro","Macanudo Vintage 2006","Macanudo Vintage 2010","Macanudo Vintage 2013","Macanudo Vintage Maduro 1997","Made Man","Magellan Dominicans","Mark Twain","Mark Twain Memoir","Mark Twain Novellas","Mark Twain Riverboat","Mark Twain Rough Drafts","Mark Twain The Press","Menace by Black Crown","MISTAKES","Montecristo 1935 Anniversary Edicion Doble Diamante","Montecristo 1935 Anniversary Nicaragua","Montecristo 1935 Edicion Diamante","Montecristo Classic","Montecristo Crafted By AJ Fernandez","Montecristo Epic","Montecristo Epic Vintage 12","Montecristo Espada","Montecristo Espada Oscuro","Montecristo Media Noche","Montecristo Memories (Cigarillos)","Montecristo Monte","Montecristo Nicaragua","Montecristo Original","Montecristo Perlado","Montecristo Platinum","Montecristo Viejo","Montecristo White Label","Montesino","My Father","My Father Connecticut","My Father El Centurion","My Father Flor de Las Antillas","My Father Fonseca","My Father La Antiguedad","My Father La Gran Oferta","My Father La Opulencia","My Father La Promesa","My Father Le Bijou 1922","My Father The Judge","Nat Sherman Metropolitan Maduro","Nestor Miranda Special Selection","Nestor Reserve Maduro","New Cuba","New Cuba Connecticut","New Cuba Fuerte","New Cuba Maduro","New Cuba Superior Connecticut","Nica Libre","Nica Libre Aganorsa","Nica Libre Connecticut","Nica Libre Estopilla","Nica Libre Oliva","Nica Libre Silver 25th Anniversary","Nica Libre Sun Grown","Nica Rustica Adobe","Nicaragua Cream","Nicaraguan Ligero-Laced 2nds","Nicaraguan Sweets 2nds","Nub Cain FF by Oliva","Nub Cameroon by Oliva","Nub Connecticut by Oliva","Nub Double Maduro by Oliva","Nub Habano by Oliva","Nub Habano Sun Grown Double Perfecto","Nub Maduro by Oliva","Nub Nuance by Oliva","Nub Sumatra by Oliva","Obsidian","Obsidian White Noise","Odyssey Coffee","Odyssey Connecticut","Odyssey Full","Odyssey Habano","Odyssey Maduro","Odyssey Sweet Tip","Ole Shenandoah Cheroots","Oliva Connecticut Reserve","Oliva Flor de Oliva","Oliva Master Blends 3","Oliva Melanio CI 25th Anniversary","Oliva Saison","Oliva Saison Maduro","Oliva Serie G","Oliva Serie G Maduro","Oliva Serie O","Oliva Serie O Maduro","Oliva Serie V","Oliva Serie V 135th Anniversary Edicion Limitada","Oliva Serie V Maduro","Oliva Serie V Melanio","Oliva Serie V Melanio Edicion Ano 2023 Figurino","Oliva Serie V Melanio Maduro","Oliva Serie V Nub","Omar Ortez Maduro","Omar Ortez Originals","Onyx Bold Nicaragua","Onyx Vintage Nicaragua","Original Cubans","Oro Cubano Aniversario","Ortega Cubao","Oscar Valladares McFly","Ozgener Aramas","Ozgener Bosphorus","Padron 1926 Series 40th Anniversary","Padron 1926 Series 80th Anniversary","Padron 1926 Series Maduro","Padron 1926 Series Natural","Padron 1926 Series No. 90","Padron 1964 Anniversary Series Maduro","Padron 1964 Anniversary Series Natural","Padron Damaso","Padron Family Reserve","Padron Maduro","Padron Natural","Palma Real","Palma Real Maduro","Panter Small Cigars","Panter Specialty Small Cigars","Parodi by Avanti","Partagas","Partagas 1845 Clasico","Partagas 1845 Extra Fuerte","Partagas 1845 Extra Oscuro","Partagas Black Label","Partagas Cifuentes","Partagas Cifuentes Maduro","Partagas Cortado","Partagas de Bronce","Partagas Heritage","Partagas Legend","Partagas Valle Verde","Perdomo 20th Anniversary Connecticut","Perdomo 20th Anniversary Maduro","Perdomo 20th Anniversary Sun Grown","Perdomo 30th Anniversary Box-Pressed Connecticut","Perdomo 30th Anniversary Box-Pressed Maduro","Perdomo 30th Anniversary Box-Pressed Sun Grown","Perdomo Double Aged 12 Year Vintage Connecticut","Perdomo Double Aged 12 Year Vintage Maduro","Perdomo Double Aged 12 Year Vintage Sun Grown","Perdomo Fresco","Perdomo Fresh-Rolled Cuban Wheels","Perdomo Habano Bourbon Barrel-Aged Connecticut","Perdomo Habano Bourbon Barrel-Aged Maduro","Perdomo Habano Bourbon Barrel-Aged Sun Grown","Perdomo Inmenso Seventy Maduro","Perdomo Inmenso Seventy Sun Grown","Perdomo Lot 23","Perdomo Lot 23 Connecticut","Perdomo Lot 23 Maduro","Perdomo Mistakes","Perdomo Reserve 10th Anniv. Champagne","Perdomo Reserve 10th Anniversary Box-Pressed Maduro","Perdomo Reserve 10th Anniversary Box-Pressed Sun-Grown","Perdomo Slow-Aged Lot 826 Maduro","Perdomo Slow-Aged Lot 826 Natural","Perdomo Slow-Aged Lot 826 Sun-Grown","Perla del Mar Corojo","Perla del Mar Maduro","Perla del Mar Shade","Phillies","Pistoff Kristoff","Plasencia 1865 Alma Fuerte","Plasencia 1865 Alma Fuerte Colorado","Plasencia Alma del Campo","Plasencia Alma del Fuego","Plasencia Cosecha 149","Plasencia Cosecha 151","Plasencia Reserva Original","Plasencia Year of the Dragon","Project E San Andres by Epic Cigars","Protocol Official Misconduct","Protocol Probable Cause","Protocol Themis","Punch Bareknuckle","Punch Cigarillos","Punch Clasico","Punch Deluxe","Punch Diablo","Punch Dragon Fire","Punch Golden Era","Punch Gran Puro","Punch Gran Puro Nicaragua","Punch Grand Cru","Punch Knuckle Buster","Punch Knuckle Buster Maduro","Punch Rare Corojo","Punch Signature","Puro Ambar Legacy","Puros Indios Candela","Puros Indios Roly","Quesada Oktoberfest 2023","Quorum","Ramon Bueso Genesis Connecticut","Ramon Bueso Genesis Habano","Ramon Bueso Genesis Oscuro","Ramon Bueso Genesis The Project","Ramon Bueso Olancho Vintage","REO","Rex Britannia","Rocky Patel 15th Anniversary","Rocky Patel ALR Second Edition","Rocky Patel Broadleaf","Rocky Patel Cargo","Rocky Patel Catch 22","Rocky Patel Connecticut","Rocky Patel Conviction","Rocky Patel Dark Star","Rocky Patel DBS (Double Broadleaf Selection)","Rocky Patel Decade Cigars","Rocky Patel Disciple","Rocky Patel Edge Square Corojo","Rocky Patel Edge Square Maduro","Rocky Patel Edicion Unico","Rocky Patel Fifty-Five","Rocky Patel Flor de San Andres","Rocky Patel Flor de San Andres Black","Rocky Patel Gold Label","Rocky Patel Grand Reserve","Rocky Patel Hamlet 25th Year","Rocky Patel Imperial","Rocky Patel ITC Emerald","Rocky Patel ITC Limited Reserve","Rocky Patel ITC Super Fuerte Maduro","Rocky Patel ITC Super Fuerte Natural","Rocky Patel LB1","Rocky Patel Number 6","Rocky Patel Olde World Reserve","Rocky Patel Puro Cubano by Hamlet","Rocky Patel Quarter Century","Rocky Patel Royal Vintage","Rocky Patel Royale","Rocky Patel Royale Fumas","Rocky Patel Seed to Smoke Classic","Rocky Patel Seed to Smoke Shade","Rocky Patel Sixty","Rocky Patel Sun Grown","Rocky Patel Sun Grown Maduro","Rocky Patel The Edge 20th Anniversary","Rocky Patel The Edge A-10","Rocky Patel The Edge B52","Rocky Patel The Edge Barrel-Aged","Rocky Patel The Edge Barrel-Aged Black","Rocky Patel The Edge Candela","Rocky Patel The Edge Connecticut","Rocky Patel The Edge Corojo","Rocky Patel The Edge Fumas","Rocky Patel The Edge Habano","Rocky Patel The Edge Maduro","Rocky Patel The Edge Sumatra","Rocky Patel Vintage 1990","Rocky Patel Vintage 1992","Rocky Patel Vintage 1999 Connecticut","Rocky Patel Vintage 2003 Cameroon","Rocky Patel Vintage 2006 San Andreas","Rocky Patel Vintage 20th Anniversary","Rocky Patel Vintage 2nds","Rocky Patel White Label","RoMa Craft Baka","RoMa Craft CroMagnon","RoMa Craft CroMagnon Aquitaine","RoMa Craft Intemperance BA XXI","RoMa Craft Intemperance EC XVIII","RoMa Craft Intemperance Volstead VO 1920","RoMa Craft Intemperance Whiskey Rebellion 1794","RoMa Craft Neanderthal","Romeo by Romeo y Julieta","Romeo San Andres by Romeo y Julieta","Romeo y Julieta 1875","Romeo y Julieta 1875 Connecticut Nicaragua","Romeo y Julieta 1875 Nicaragua","Romeo y Julieta Aniversario","Romeo y Julieta Book of Love","Romeo y Julieta by AJ Fernandez","Romeo y Julieta Envy Amulet","Romeo y Julieta Media Noche","Romeo y Julieta Miniatures","Romeo y Julieta Perlado","Romeo y Julieta Reserva Real","Romeo y Julieta Reserva Real Nicaragua",
    "Romeo y Julieta Reserva Real Twisted Love Story & Twisted Toro","Romeo y Julieta Reserve","Romeo y Julieta Reserve Maduro","Romeo y Julieta Viejo","Romeo y Julieta Vintage","Ron Mexico","Room101 Big Payback Maduro","Room101 Breakfast in Portugal","Room101 Daruma","Room101 Doomsayer","Room101 FARCE","Room101 FARCE Connecticut","Room101 FARCE Maduro","Room101 Farce Nicaragua","Room101 Ichiban Connecticut","Room101 Ichiban Habano","Room101 Ichiban Maduro","Room101 Johnny Tobacconaut","Room101 Miami Snow","Room101 Muzzle Loader","Room101 Payback Nicaragua","Room101 The Big Payback Connecticut","Room101 The Big Payback Sumatra","Saint Luis Rey","Saint Luis Rey Serie G Maduro","Saint Luis Rey Serie G Natural","San Cristobal","San Cristobal Elegancia","San Cristobal Ovation","San Cristobal Quintessence","San Cristobal Revelation","Sancho Panza","Sancho Panza Double Maduro","Sancho Panza Extra-Fuerte","Schizo","Schizo Maduro","Shady Moose","Shrapnel","Sir Robert Peel","Southern Draw Cedrus","Southern Draw Firethorn Habano Rosado","Southern Draw Kudzu Oscuro","Southern Draw La Manzanita","Southern Draw Rose of Sharon","Southern Draw Rose of Sharon Desert Rose","Stillwell Star Holiday Y2022 by Dunbarton Tobacco & Trust","Stogies Cuban Sandwich by Victor Sinclair","Super Fly by Oscar Valladares","Super Fly Connecticut by Oscar Valladares","Super-Premium 2nds","Swisher Sweets Cigars and Cigarillos","Tatiana Caribbean Chill Flavored Cigars","Tatiana Cherry Flavored Cigars","Tatiana Chocolate Flavored Cigars","Tatiana Chocolate Mint Flavored Cigars","Tatiana Cinnamon Flavored Cigars","Tatiana Cognac Flavored Cigars","Tatiana Flavored Cigarillos","Tatiana Flavored Cigars","Tatiana Fusion Frenzy Flavored Cigars","Tatiana Groovy Blue Flavored Cigars","Tatiana Harvest Moon Flavored Cigars","Tatiana Honey Flavored Cigars","Tatiana Mocha","Tatiana Nightcap Flavored Cigars","Tatiana Rum Flavored Cigars","Tatiana Sweet Euphoria Flavored Cigars","Tatiana Vanilla Flavored Cigars","Tatiana Waking Dream Flavored Cigars","Tatuaje 10 Year Anniversary","Tatuaje 20th Anniversary","Tatuaje Black","Tatuaje Cabaiguan","Tatuaje Cabaiguan Guapos","Tatuaje Fausto","Tatuaje Havana VI","Tatuaje Havana VI Verocu","Tatuaje Miami","Tatuaje Negociant Monopole","Tatuaje Nicaragua","Tatuaje Reserva Broadleaf","Tatuaje Series P","Tatuaje Skinny Monsters","Tatuaje Tattoo by Pete Johnson","The Bourbon Cigar","The Dude","The Upsetters","Torano Casa Torano","Torano Dominico","Torano Exodus Gold 1959","Torano Exodus Silver","Torano Hogshead","Torano Noventa","Torano Reserva Decadencia","Toscanello","Toscano","Toscano Garibaldi","Toscano Master Aged","Toscano Originale","Trinidad Espiritu No. 3","Trinidad Espiritu Series No. 2","Trinidad Espiritu Series No.1","Ugly Coyote","Varina Farms Breakfast Blend","VegaFina","Viaje Black and White","Viaje Satori","Victor Sinclair 20th Anniversary","Victor Sinclair Bohemian Bamboo","Victor Sinclair Cigarillos","Victor Sinclair Clasicos","Victor Sinclair Connecticut Yankee","Victor Sinclair Primeros","Victor Sinclair Serie ‘55’ White Label Connecticut","Victor Sinclair Triple Corojo","Victor Sinclair Vintage Doppel Gordo","Victor Sinclair Vintage Select","Victory Sinclair Overruns","Villazon Maduro","Villazon Natural","Villiger Braniff","Villiger Connecticut","Villiger Culebras","Villiger Export","Villiger Habano","Villiger Mini - Red Vanilla Cigarillos","Villiger Mini Cigarillos - Black","Villiger Mini Cigarillos Gold Filtered","Warped Chinchalle","Warped Corto","Warped Eagles Descent","Warped Flor Del Valle","Warped Futuro","Warped La Colmena","Warped La Colmena Black Honey","Warped La Hacienda","Warped Serie Gran Reserva 1988","White Heather by JC Newman","White Owl Cigars","Wilde Cigars Minis","Zino Nicaragua","Zino Platinum Crown Series","Zino Platinum Scepter Series"]
    const preprocessedItems = new Set(itemNames.map(item => item.toLowerCase().replace(/\s+/g, ' ').trim()));    
    return processMultipleEntries(input, preprocessedItems);
}
