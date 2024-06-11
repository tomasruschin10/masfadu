import React, { Component } from "react";
import { View, Text } from "react-native";

//Importamos los componentes del package
import Svg, { G, Path, SvgCss } from "react-native-svg/css";

const xmlInicio = (color) => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
  <path d="M7.03467 21.8141L28.1023 5.42822L49.1699 21.8141V47.5635C49.1699 48.8051 48.6767 49.9959 47.7987 50.8739C46.9207 51.7519 45.7299 52.2452 44.4882 52.2452H11.7164C10.4747 52.2452 9.28389 51.7519 8.4059 50.8739C7.52792 49.9959 7.03467 48.8051 7.03467 47.5635V21.8141Z" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.0796 52.2449V28.8364H35.1247V52.2449" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
};

const xmlMateria = (color) => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
  <path d="M5.11865 7.76855H19.1637C21.6471 7.76855 24.0287 8.75505 25.7846 10.511C27.5406 12.267 28.5271 14.6486 28.5271 17.1319V49.9038C28.5271 48.0413 27.7872 46.2551 26.4703 44.9381C25.1533 43.6211 23.3671 42.8812 21.5046 42.8812H5.11865V7.76855Z" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M51.9358 7.76855H37.8907C35.4074 7.76855 33.0258 8.75505 31.2698 10.511C29.5138 12.267 28.5273 14.6486 28.5273 17.1319V49.9038C28.5273 48.0413 29.2672 46.2551 30.5842 44.9381C31.9012 43.6211 33.6874 42.8812 35.5499 42.8812H51.9358V7.76855Z" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `;
};

const xmlPublica = (color) => {
  return `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 25.6 25.6" style="enable-background:new 0 0 25.6 25.6;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F5FBFF;}
	.st1{fill:#1E1E23;}
	.st2{fill:#2A2A30;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#171819;}
	.st5{fill:#BDD353;}
	.st6{fill:#D4FC39;}
	.st7{fill:#D1F43B;}
	.st8{fill:#EB5E29;}
	.st9{fill:#DD5A31;}
	.st10{fill:#CDEF3F;}
	.st11{fill:#E0572D;}
	.st12{fill:#506FD3;}
	.st13{fill:#EFECE5;}
	.st14{clip-path:url(#SVGID_00000001642820697183090130000001315361669409719436_);}
	.st15{clip-path:url(#SVGID_00000119113666596853619510000006382794921110056889_);}
	.st16{opacity:0.78;clip-path:url(#SVGID_00000119113666596853619510000006382794921110056889_);}
	.st17{opacity:0.78;}
	.st18{fill:#1F1E23;}
	.st19{opacity:0.2;}
	.st20{clip-path:url(#SVGID_00000118384091448090960680000006644753376406261126_);}
	.st21{opacity:0.78;clip-path:url(#SVGID_00000118384091448090960680000006644753376406261126_);}
	.st22{fill:#111010;}
	.st23{opacity:0.85;clip-path:url(#SVGID_00000014609400570414707580000009054023007197258397_);}
	.st24{opacity:0.85;}
	.st25{clip-path:url(#SVGID_00000085956134010436249980000003054707070562417284_);}
	.st26{fill:#101010;}
	.st27{clip-path:url(#SVGID_00000080918330524914205810000016865480510638743482_);}
	.st28{clip-path:url(#SVGID_00000165212408827532603760000002880859875273495996_);}
	.st29{clip-path:url(#SVGID_00000116234391339890220840000010895775496734188720_);}
	.st30{fill:#3C4EF4;}
	.st31{clip-path:url(#SVGID_00000117665430588445093680000006047939591103391374_);}
	.st32{clip-path:url(#SVGID_00000164490181868756664790000011971986008383614102_);}
	.st33{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
	.st34{clip-path:url(#SVGID_00000131360217818146900170000013673541844820650924_);}
	.st35{fill:#606060;}
	.st36{fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
	.st37{fill:none;stroke:#FF00FF;stroke-width:0.5;stroke-miterlimit:10;}
	.st38{fill:none;stroke:#0000FF;stroke-width:0.5;stroke-miterlimit:10;}
	.st39{fill:none;stroke:#FF00FF;stroke-width:0.25;stroke-miterlimit:10;}
	.st40{fill:none;stroke:#DD2C2C;stroke-miterlimit:10;}
	.st41{fill:none;stroke:#C64646;stroke-miterlimit:10;}
	.st42{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st43{fill:none;stroke:#000000;}
	.st44{fill:none;stroke:#FDE500;stroke-width:0.25;stroke-miterlimit:10;}
	.st45{fill:none;stroke:#EC1C24;stroke-miterlimit:10;}
	.st46{fill:none;stroke:#35F719;stroke-width:7;stroke-miterlimit:10;}
	.st47{clip-path:url(#SVGID_00000101072117568716729460000003640466504473843592_);}
	.st48{clip-path:url(#SVGID_00000003800187233827305730000004436660788592266374_);}
	.st49{fill:#202630;}
	.st50{fill:#DA3832;}
	.st51{fill:#F7D247;}
	.st52{fill:#1501ED;}
	.st53{fill:none;stroke:#EFECE5;stroke-width:13;stroke-miterlimit:10;}
	.st54{clip-path:url(#SVGID_00000177473254400135333660000007026236305879130776_);}
	.st55{clip-path:url(#SVGID_00000113322815360068585900000006511784035347559087_);}
	.st56{opacity:0.69;}
	.st57{opacity:0.4;clip-path:url(#SVGID_00000105394716073922064590000013508656775601524118_);}
	.st58{opacity:0.3;}
	.st59{opacity:0.66;clip-path:url(#SVGID_00000041998259184230206400000009043830959303261316_);}
	.st60{opacity:0.4;clip-path:url(#SVGID_00000016790425591426373070000011833264926488360582_);}
	.st61{opacity:0.7;}
	.st62{clip-path:url(#SVGID_00000170242957131067869590000005896194825717062568_);}
	.st63{opacity:0.4;clip-path:url(#SVGID_00000015325003759732659020000014933643129606214079_);}
	.st64{clip-path:url(#SVGID_00000001639780410931222130000006430038749059352713_);}
	.st65{opacity:0.4;clip-path:url(#SVGID_00000173146715338955418180000017675986173986052518_);}
	.st66{clip-path:url(#SVGID_00000078749151571808789520000001940818997912723899_);}
	.st67{clip-path:url(#SVGID_00000085970595483158459230000000893112744839317418_);}
	.st68{clip-path:url(#SVGID_00000097494570717712479410000016834357887882501785_);}
	.st69{opacity:0.66;clip-path:url(#SVGID_00000178919950577919463970000001848563136068151181_);}
	.st70{clip-path:url(#SVGID_00000178170600303024145460000004721327388915249288_);}
	.st71{opacity:0.4;clip-path:url(#SVGID_00000092451064908849587390000010654532232472811188_);}
	.st72{opacity:0.4;clip-path:url(#SVGID_00000002346736032063616570000010153353473483101592_);}
	.st73{opacity:0.4;clip-path:url(#SVGID_00000148650394718012049160000003876076934855297410_);}
	.st74{clip-path:url(#SVGID_00000022544823485556658070000002685815154728013481_);}
	.st75{clip-path:url(#SVGID_00000007388189497375811060000006100678733153462682_);}
	.st76{clip-path:url(#SVGID_00000124153624933985700720000005067483365197493687_);}
	.st77{opacity:0.4;clip-path:url(#SVGID_00000030463228222257411610000004357324627318912654_);}
	.st78{opacity:0.4;clip-path:url(#SVGID_00000088816499781723012200000003032510272381746071_);}
	.st79{clip-path:url(#SVGID_00000085935130747632934490000008364625241574698124_);}
	.st80{opacity:0.4;clip-path:url(#SVGID_00000139254527826521185110000014365491739616331403_);}
	.st81{clip-path:url(#SVGID_00000101790659309797286390000000490548531290321339_);}
	.st82{opacity:0.4;clip-path:url(#SVGID_00000057870298569898039030000010909951865639250050_);}
	.st83{clip-path:url(#SVGID_00000086676625053198675450000011387357762343205560_);}
	.st84{opacity:0.4;clip-path:url(#SVGID_00000042704300174040388120000012942515727787483796_);}
	.st85{clip-path:url(#SVGID_00000177449688955749724940000013865460473194669481_);}
	.st86{clip-path:url(#SVGID_00000148659010082833956440000005260846135527215795_);}
	.st87{opacity:0.4;clip-path:url(#SVGID_00000132083616685912028580000004746894465841337776_);}
	.st88{clip-path:url(#SVGID_00000006680250691597677080000007900483033973518733_);}
	.st89{opacity:0.4;clip-path:url(#SVGID_00000046312801383196799190000011314622073613434781_);}
	.st90{clip-path:url(#SVGID_00000161608235772844535510000018361091172549186994_);}
	.st91{opacity:0.4;clip-path:url(#SVGID_00000114765839524919084860000005440992187341687429_);}
	.st92{clip-path:url(#SVGID_00000008858602426659605140000002668073837644187827_);}
	.st93{clip-path:url(#SVGID_00000171683816171618258160000016432854116159271351_);}
	.st94{clip-path:url(#SVGID_00000016789628077742950460000018146560745502043293_);}
	.st95{fill:#FF8683;}
	.st96{clip-path:url(#SVGID_00000019640588540491516640000001404034970459339153_);}
	.st97{opacity:0.4;clip-path:url(#SVGID_00000049933403131964536380000009210525485637538728_);}
	.st98{clip-path:url(#SVGID_00000135666559987158704120000005383698160617779623_);}
	.st99{opacity:0.4;clip-path:url(#SVGID_00000127741300850841437300000017161360027107207815_);}
	.st100{fill:#4945D8;}
	.st101{clip-path:url(#SVGID_00000117660828088012046890000014548157573538950068_);}
	.st102{clip-path:url(#SVGID_00000018212629657158243240000015646103320539080636_);}
	.st103{opacity:0.78;clip-path:url(#SVGID_00000018212629657158243240000015646103320539080636_);}
	.st104{clip-path:url(#SVGID_00000124158262003610236650000001682927467428874880_);}
	.st105{opacity:0.78;clip-path:url(#SVGID_00000124158262003610236650000001682927467428874880_);}
	.st106{opacity:0.85;clip-path:url(#SVGID_00000149380111972192512470000003658549090960325043_);}
	.st107{clip-path:url(#SVGID_00000133516399472520281540000003118657947771966908_);}
	.st108{clip-path:url(#SVGID_00000085241086251481041760000010150273711705164678_);}
	.st109{clip-path:url(#SVGID_00000116199082042910808500000012964602612214182795_);}
	.st110{opacity:0.4;clip-path:url(#SVGID_00000094610052349588704990000014015685367497090485_);}
	.st111{opacity:0.66;clip-path:url(#SVGID_00000158724442859909275940000015556922149403146900_);}
	.st112{opacity:0.4;clip-path:url(#SVGID_00000142869279797307639270000013556124365201590187_);}
	.st113{clip-path:url(#SVGID_00000044886380594117533640000007817918778254493069_);}
	.st114{clip-path:url(#SVGID_00000140009558919710270770000009492489520066456490_);}
	.st115{opacity:0.4;clip-path:url(#SVGID_00000047028419577278781110000004039675962507447991_);}
	.st116{clip-path:url(#SVGID_00000011023317800778892930000010156851543881766330_);}
	.st117{opacity:0.4;clip-path:url(#SVGID_00000014598711468463687110000011486289645302937020_);}
	.st118{opacity:0.4;clip-path:url(#SVGID_00000181067424020938571580000014973056372814090132_);}
	.st119{clip-path:url(#SVGID_00000090988686787772208610000003522400630826820537_);}
	.st120{clip-path:url(#SVGID_00000098181454445748897760000001193773739106136224_);}
	.st121{opacity:0.4;clip-path:url(#SVGID_00000070084211453809508310000011745984119994825658_);}
	.st122{opacity:0.4;clip-path:url(#SVGID_00000098195960635865018790000012222018204831929751_);}
	.st123{clip-path:url(#SVGID_00000027592236504447489720000009417006870121652620_);}
	.st124{opacity:0.4;clip-path:url(#SVGID_00000181797593539549380020000009412934093181009555_);}
	.st125{opacity:0.4;clip-path:url(#SVGID_00000115493269515192156560000014765389042794999946_);}
	.st126{opacity:0.4;clip-path:url(#SVGID_00000156564775955363541440000013724002286227064494_);}
	.st127{clip-path:url(#SVGID_00000116916329354964642200000013499896166470444162_);}
	.st128{clip-path:url(#SVGID_00000151532249235672610450000009591614786072317313_);}
	.st129{fill:#3AF947;}
	.st130{opacity:0.4;clip-path:url(#SVGID_00000035510930709286671280000016763172945408443526_);}
	.st131{clip-path:url(#SVGID_00000182528230149014478520000002675857105859862971_);}
	.st132{clip-path:url(#SVGID_00000075846132235132515600000015548430229726726578_);}
	.st133{clip-path:url(#SVGID_00000124158478211842774770000013376497693282776716_);}
	.st134{clip-path:url(#SVGID_00000022529714219079737990000003554691516907325068_);}
	.st135{clip-path:url(#SVGID_00000131361917919324643830000000372510805189717148_);}
	.st136{clip-path:url(#SVGID_00000077291991265031059270000005922703374357914257_);}
	.st137{clip-path:url(#SVGID_00000118377904735481251840000009123779416997169287_);}
	.st138{clip-path:url(#SVGID_00000101091903602956641620000005515601093522492043_);}
	.st139{fill:#010101;}
	.st140{fill:#90F680;}
	.st141{fill:#3A4BF1;}
	.st142{clip-path:url(#SVGID_00000096043935899050995490000004285342682477768095_);}
	.st143{opacity:0.78;clip-path:url(#SVGID_00000096043935899050995490000004285342682477768095_);}
	.st144{clip-path:url(#SVGID_00000126319636031553591030000009967117324661944470_);}
	.st145{clip-path:url(#SVGID_00000127731749850815603170000004786497977887841695_);}
	.st146{clip-path:url(#SVGID_00000061439300719391213420000008845908675053035915_);}
	.st147{opacity:0.4;clip-path:url(#SVGID_00000083050396563405770550000017443030054623408062_);}
	.st148{fill:none;stroke:#FFFFFF;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st149{opacity:0.5;fill:#506BAD;}
	.st150{opacity:0.6;fill:#506BAD;}
	.st151{fill:#EB5E29;stroke:#232428;stroke-width:0.5;stroke-miterlimit:10;}
	.st152{fill:none;stroke:#FFFFFF;stroke-width:0.75;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st153{fill:#D4FC39;stroke:#27282B;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st154{fill:none;stroke:#151613;stroke-width:0.5;stroke-miterlimit:10;}
	.st155{fill:#EB5E29;stroke:#151613;stroke-width:0.5;stroke-miterlimit:10;}
	.st156{fill:#D4FC39;stroke:#232428;stroke-width:0.5;stroke-miterlimit:10;}
	.st157{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st158{fill:none;stroke:#FFFFFF;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st159{fill:#EB5E29;stroke:#1C1D21;stroke-width:0.5;stroke-miterlimit:10;}
	.st160{fill:none;stroke:#232428;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st161{fill:#232428;}
	.st162{fill:none;stroke:#FFFFFF;stroke-width:0.65;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st163{fill:#C2D841;}
	.st164{fill:#506ED2;}
	.st165{fill:#DF5F36;}
	.st166{fill:none;stroke:#F8F9F4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st167{fill:none;stroke:#F9F9F9;stroke-width:0.75;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st168{fill:none;stroke:#F8F9F4;stroke-width:0.75;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st169{fill:none;stroke:#D4FC39;stroke-miterlimit:10;}
	.st170{fill:none;stroke:#FFFFFF;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st171{fill:none;stroke:#CDEF3F;stroke-miterlimit:10;}
	.st172{fill:none;stroke:#D4FC39;stroke-width:1.2;stroke-miterlimit:10;}
	.st173{fill:url(#SVGID_00000016072594870204088790000010511984450025480593_);}
	.st174{fill:url(#SVGID_00000075852087836630897140000010491337760393301922_);}
	.st175{fill:url(#SVGID_00000067232788623507019710000009807307436008365486_);}
	.st176{fill:url(#SVGID_00000103958572433089847470000018431046505815400103_);}
	.st177{fill:none;stroke:#EB5E29;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st178{fill:none;stroke:#EB5E29;stroke-width:0.5;stroke-miterlimit:10;}
	.st179{fill:none;stroke:#DCDDE9;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st180{fill:none;stroke:#D2D5D8;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st181{fill:#D2D5D8;}
	.st182{fill:#DCDDE9;}
	.st183{fill:#BEC2C6;}
	.st184{fill:#D1DBE0;}
	.st185{fill:${color};}
	.st186{fill:#A8ACAD;}
	.st187{fill:none;stroke:#EB5E29;stroke-width:0.75;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st188{fill:none;stroke:#303033;stroke-width:0.25;stroke-miterlimit:10;}
	.st189{fill:#A9ACAC;}
</style>
<circle class="st185" cx="12.8" cy="12.8" r="12.8"/>
<g>
	<path class="st0" d="M19.4,13.8h-5.5v5.6h-2.2v-5.6H6.2v-2h5.5V6.2h2.2v5.6h5.5V13.8z"/>
</g>
</svg>
    `;
};

const xmlOpiniones = (color) => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="57" viewBox="0 0 58 57" fill="none">
  <path d="M29.0318 52.2452C41.9599 52.2452 52.4402 41.7648 52.4402 28.8367C52.4402 15.9085 41.9599 5.42822 29.0318 5.42822C16.1036 5.42822 5.62329 15.9085 5.62329 28.8367C5.62329 41.7648 16.1036 52.2452 29.0318 52.2452Z" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.6685 33.5181C19.6685 33.5181 23.1797 38.1998 29.0318 38.1998C34.884 38.1998 38.3952 33.5181 38.3952 33.5181" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22.0094 21.8135H22.0328" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M36.0544 21.8135H36.0779" stroke=${color} stroke-width="4.01288" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `;
};

const xmlMenu = (color) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
      <rect  y="10" width="57" height="6" rx="3" fill=${color}/>
      <rect y="25" width="57" height="6" rx="3" fill=${color}/>
      <rect y="40" width="57" height="6" rx="3" fill=${color}/>
    </svg>
  `;
};
export const InicioMenu = ({ color }) => (
  <SvgCss
    style={{ marginBottom: 3 }}
    xml={xmlInicio(color)}
    width="90%"
    height="90%"
  />
);

export const InicioMateria = ({ color }) => (
  <SvgCss
    style={{ marginBottom: 3 }}
    xml={xmlMateria(color)}
    width="90%"
    height="90%"
  />
);

export const InicioPublica = ({ color }) => (
  <SvgCss
    style={{ marginBottom: 3 }}
    xml={xmlPublica(color)}
    width="90%"
    height="90%"
  />
);

export const InicioOpiniones = ({ color }) => (
  <SvgCss
    style={{ marginBottom: 3 }}
    xml={xmlOpiniones(color)}
    width="90%"
    height="90%"
  />
);
export const MenuInicio = ({ color }) => (
  <SvgCss
    style={{ marginBottom: 3 }}
    xml={xmlMenu(color)}
    width="90%"
    height="90%"
  />
);
