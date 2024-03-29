import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';

const HerStoryScreen = () => {
  return (
    <>
      <Banner
        title="Me Petra"
        src="/images/pepsz-yogaban-1280x360.webp"
        alt="Petra"
      />
      <Container>
        <p className="lead">
          <strong>Csetneki Petra</strong> vagyok, a <strong>La’saphire</strong>{' '}
          alapítója. Ez nekem egy szerelemprojekt, amit két éve kezdtem el
          számomra is váratlan módon: teljesen meglepetésszerúen ért, nem volt
          eltervezve a projekt.
        </p>
        <p className="lead">
          Amúgy foglalkozásom szerint jógaoktató-masszőr-edző vagyok 10 éve,
          valamint mostmár illusztrátor+webdesigner-tanonc is, szóval ez ia
          kozmetikumvonal lyen imádomhobby eleme az életemnek, ami meglehetősen
          hasznos ( így boldogan el tudom magam látni az alapcikkekkel) nekem,
          és a közvetlen környezetemnek is, akik szintén házi kencéket
          szeretnének használni inkább a bolti, műanyagszerűségek helyett. Mivel
          szabadúszó vállalkozóként élek, és szeretek a hobbijaimból projekteket
          csinálni, úgy gondoltam a La’saphire több élethalmaznak is a metszete
          lesz, és elnézve a fogyasztási és használati cikkek terén terjedő
          végre pozitív, tudatosabb és környezetbarát trendeket, remélem hogy
          ezzel a kézi készítésű, kisszériás márkával olyanok keresletét tudom
          kielégíteni, akik szép lassan de biztosan mennek a
          hazai-természetes-minőségi-kisvállalkozói paletták termékei felé.
        </p>
        <div className="ps-images-group" style={{ height: '600px' }}>
          <div className="ps-image-item">
            <img src="/images/IMG-0273-768x1024.png" alt="Petra" />
          </div>
          <div className="ps-image-item">
            <img src="/images/IMG-9746.png" alt="" />
          </div>
        </div>
        <div className="ps-images-group" style={{ height: '600px' }}>
          <div className="ps-image-item">
            <img src="/images/mePetra-03-1024x1024.jpg" alt="Petra" />
          </div>
          <div className="ps-image-item">
            <img src="/images/image_6483441-2-1024x571.jpg" alt="Petra" />
          </div>
        </div>
        <p className="lead">
          A natúrkozmetikumok és hatóanyagaik területe azért is keltette fel az
          érdeklődésemet, mert az amúgy alap szakmáim és érdeklődési területeim
          is érintik a test, így a bőr és szépségápolás témáját is, valamint az
          új kedvenc rajzos témám: a virágok, fűszernövények, azaz a hatóanyagok
          illusztrálása is egy miniprojektem. Nagyon szeretem az illóolajokat,
          tök jó lenne lexikálisan tudni minden gyógynövény, fűszernövény és vaj
          jótékony hatását, így azt is élvezem, hogy sokat tanulhatok
          receptgyűjtögetés és készítés közben.
        </p>
        <p className="lead">
          Hobbi szinten a kertészkedés és a fűszernövény termesztés is érdekel,
          és 2021es évben volt az első komolyabb kertészkedős, ültetős és
          palántanevelős évem. Sok sok fűszernövény termett, amik egy részét már
          lelegeltem, viszont többen cserépben vannak és így együtt éldegélünk
          miközben figyelem a növekedésüket. Ők adnak hozzávalókat,
          hatóanyagokat és díszítést a szappanokhoz, és nagyon jó érzés saját
          termesztésű növényekkel és az itt élő rózsákkal kiegészíteni a
          termékeket. Minden évben kétszer virágzik a hatalmas gyönyörú sárga és
          vörös rózsabokor a kertben, és a lehullott szirmokat örömmel
          használom.
        </p>
        <p className="lead">
          gyekszem tartani magam a napi / heti életmódrutinomhoz és minden nap
          időt szánni a változatos testmozgásra, amik közül az egyik kedvencem
          még mindig a jóga. Foglalkozásomnál fogva mániám minden
          testet-egészséget-életminőséget javító és egyszerűsítő lifehack, és a
          natúrkozmetikumok is pont ebbe illenek bele. Miután elkezdtem nagyon
          érzékeny lenni a vegyszerekre ( nyálkahártya kaparás, kellemetlen,
          szúró, égető bizsergés a bőrön és alatta), és leesett, hogy milyen
          fontos külön a bőr, ( + az arc, a tartás, a légzés és minden más)
          wellness+fitness tervét tudatosítani: teljesen kézenfekvőnek jött ez a
          kis projekt, amit azóta is ápolgatok és növesztgetek.
        </p>
        <div className="row justify-content-center">
          <div className="ps-single-image">
            <img src="/images/sepru-2-trans.png" alt="sepru" />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HerStoryScreen;
