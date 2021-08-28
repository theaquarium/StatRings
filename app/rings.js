import document from 'document';
import { statColors, iconPaths } from '../common/consts';
import { getSettings } from './settings';
import { getStatValue, getGoalValue } from './utils';

const vw = 336;
const vh = 336;

const rings = [];

class Ring {
  constructor(id, stat, options) {
    this.id = id;
    this.stat = stat;
    this.options = options;
    
    this.color = statColors[this.stat];
    
    this.bg = document.getElementById(`ring${id}-bg`);
    this.fg = document.getElementById(`ring${id}-fg`);
    this.c1 = document.getElementById(`ring${id}-c1`);
    this.c2 = document.getElementById(`ring${id}-c2`);
    this.icon = document.getElementById(`ring${id}-icon`);
    
    this.radius = (this.options.outerRingSize - this.id * 2 * (this.options.ringThickness + this.options.ringSpacing)) / 2;
    this.cx = vw - this.options.rightSpacing - this.options.outerRingSize / 2;
    this.cy = vh - this.options.bottomSpacing - this.options.outerRingSize / 2;
  }
  
  initialize() {
    this.bg.arcWidth = this.options.ringThickness;
    this.bg.x = this.cx - this.radius;
    this.bg.y = this.cy - this.radius;
    this.bg.width = 2 * this.radius;
    this.bg.height = 2 * this.radius;
    this.bg.style.fill = pSBC(this.options.darknessPercentage, this.color);

    this.fg.arcWidth = this.options.ringThickness;
    this.fg.x = this.cx - this.radius;
    this.fg.y = this.cy - this.radius;
    this.fg.width = 2 * this.radius;
    this.fg.height = 2 * this.radius;
    this.fg.style.fill = this.color;
    this.fg.sweepAngle = 360;
    
    this.c1.r = this.options.ringThickness / 2 - 1;
    this.c1.style.fill = this.color;
    this.c1.cx = this.cx;
    this.c1.cy = this.cy - this.radius + this.options.ringThickness / 2;
    
    this.c2.r = this.options.ringThickness / 2 - 1;
    this.c2.style.fill = this.color;
    this.c2.cx = this.cx;
    this.c2.cy = this.cy - this.radius + this.options.ringThickness / 2;
    
    this.icon.href = iconPaths[this.stat];
    this.icon.width = this.options.iconSize;
    this.icon.height = this.options.iconSize;
    this.icon.style.fill = this.color;
    this.icon.x = vw - this.options.iconRightSpacing - this.options.iconSize;
    this.icon.y = vh - this.options.bottomSpacing - this.options.outerRingSize + this.options.iconFromCircleTop + this.id * (this.options.iconSize + this.options.iconVerticalBetweenSpacing);
  }
  
  /*hide() {
    this.bg.style.display = "none";
    this.fg.style.display = "none";
    this.c1.style.display = "none";
    this.c2.style.display = "none";
    this.icon.style.display = "none";
  }
  
  show() {
    this.bg.style.display = "inline";
    this.fg.style.display = "inline";
    this.c1.style.display = "inline";
    this.c2.style.display = "inline";
    this.icon.style.display = "inline";
  }*/
  
  setPercentage(p) {
    const asAngleDegrees = convertPercentageToAngle(p);
    this.fg.sweepAngle = asAngleDegrees;
    
    const degreesStandardPosition = asAngleDegrees + 90;
    const asAngleRadians = degreesStandardPosition * Math.PI / 180;
    this.c2.cx = this.cx - (this.radius - this.options.ringThickness / 2) * Math.cos(asAngleRadians);
    this.c2.cy = this.cy - (this.radius - this.options.ringThickness / 2) * Math.sin(asAngleRadians);
  }
  
  update() {
    const val = getStatValue(this.stat);
    const goal = getGoalValue(this.stat);
    this.setPercentage(val / goal);
  }
}

export function setupRings() {
  // Sizes
  // With Icons
  /*const options = {
    ringThickness: 12,
    ringSpacing: 3,
    outerRingSize: 140,
    bottomSpacing: 15,
    rightSpacing: 30,
    iconRightSpacing: 5,
    iconSize: 24,
    iconFromCircleTop: 0,
    iconVerticalBetweenSpacing: 6,
    darknessPercentage: -0.8,
  }*/
  // No Icons
  const options = {
    ringThickness: 14,
    ringSpacing: 3,
    outerRingSize: 164,
    bottomSpacing: 10,
    rightSpacing: 4,
    iconRightSpacing: 0,
    iconSize: 0,
    iconFromCircleTop: 0,
    iconVerticalBetweenSpacing: 0,
    darknessPercentage: -0.8,
  }
  
  const settings = getSettings();
  
  const ring0 = new Ring(0, settings.ring0Stat, options);
  ring0.initialize();
  ring0.update();
  rings.push(ring0);
  // ring0.setPercentage(Math.random());
  
  const ring1 = new Ring(1, settings.ring1Stat, options);
  ring1.initialize();
  ring1.update();
  rings.push(ring1);
  // ring1.setPercentage(Math.random());
  
  const ring2 = new Ring(2, settings.ring2Stat, options);
  ring2.initialize();
  ring2.update();
  rings.push(ring2);
  // ring2.setPercentage(Math.random());
}

export function updateRings() {
  rings.forEach((ring) => {
    ring.update();
  });
}
  
const convertPercentageToAngle = (p) => {
  return p * 360;
};

// https://stackoverflow.com/a/13542669/8005366
const pSBC = (p,c0,c1,l) => {
    const pSBCr = (d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(','),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=='a'?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d='#'+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:'');
            d=i(d. slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
  
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=='string';
    if(typeof(p)!='number'||p<-1||p>1||typeof(c0)!='string'||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;

    h=c0.length>9,h=a?c1.length>9?true:c1=='c'?!h:false:h,f=pSBCr(c0),P=p<0,t=c1&&c1!='c'?pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return'rgb'+(f?'a(':'(')+r+','+g+','+b+(f?','+m(a*1000)/1000:'')+')';
    else return'#'+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
};