import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';

const HerStoryScreen = () => {
  return (
    <>
      <Banner
        title="Our HerStory"
        src="/images/ecoprint-02.webp"
        alt="Our History"
      />
      <Container>
        <p className="lead">
          Zafír. A fekete macska, akire 20 évet vártam, ( kb 10 éves koromtól
          égett bele a klisés, archetipikus fekete boszorkánymacska képe) és aki
          két éve a legkedvesebb kis állattársam. Egy fekete macskalánnyal
          kezdtem, már kettő van: Zafír és Szofi, a kislánya a második alomból.
          Mindkettőt földöntúlian szeretem, csodálom a szépségüket, elegáns
          macskaságukat, és sose tudom megunni a fantasztikus formatervezés
          szemlélését, amit az egész lényük sugároz. Zafír egy kicsit előbb
          érkezett az életembe, mint a szappanprojekt, és valahogy egyértelműnek
          tűnt róla elnevezni az egészet: Végülis majdnem együtt startoltak
          nálam, az állatokjogai, az állatokhoz való emberi hozzáállás pedig
          amúgy is egy kollektív társadalmi téma, amin van mit boncolgatni,
          megváltoztatni és átalakítani egyéni / nagyobb skálán is.
        </p>
        <div className="ps-images-group">
          <div className="ps-image-item">
            <img src="/images/our-history-01.jpg" alt="our story 1" />
          </div>
          <div className="ps-image-item">
            <img src="/images/our-history-02.png" alt="our story 2" />
          </div>
          <div className="ps-image-item">
            <img src="/images/our-history-03.png" alt="our story 3" />
          </div>
        </div>
        <p className="lead">
          2019 telén, újdonsült macskámmal valamint újdonsült lakótársammal
          kitaláltuk, just for fun, hogy készítsünk karácsonyi szappanokat.
          Mission accomplished. Annyira jól sikerültek, hogy rajtamaradtunk, és
          elkezdtünk kísérletezni vele. Én természetesen azért voltam oda, hogy
          jól nézzen ki és illatos legyen ( frontend), ő pedig a
          biztonságosságát és működőképességét tette hozzá ( backend). A
          szappanokat később elkezdték mások is használni, az pedig külön jól
          esett, ha konstruktív építő kritikát kaptunk, így tovább tudtuk
          fejleszteni őket és nyilván mi is a sajátjainkat használjuk azóta is.
          A szappanok után jött a szilárd testápoló, ami személyesen az én
          kedvenc testápolási termékem, mivel a szárazbőrűek altípusába
          tartozom: ennél jobb, mélyen hidratálóbb és mézesbársonyosbőrös
          krémmel még nem találkoztam, és én külön szeretem a szilárdságát és az
          egyszerű használhatóságát. Majd szépen lassan elkezdtem kísérletezni
          több más, kozmetikai termékkel: végcélként szeretnék egy olyan
          szeretett Natúrkozmetikummárkát és termékpalettát, ami kielégíti a
          test és szépségápolás alapszükségleteit, minden típusból több illat és
          hatóanyagkombináció elérhető, és tartalmazzák a saját termesztésű vagy
          beszerzésű gyógy és fűszernövénye
        </p>
      </Container>
    </>
  );
};

export default HerStoryScreen;
