controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
let WhiteStarL: Sprite = null
let WhiteStar: Sprite = null
class SpaceObject extends sprites.BaseSprite {
    public map: Image;
    public left: Fx8;
    public top: Fx8;
    public vx: Fx8;
    public vy: Fx8;
    protected lastLeft: number;
    protected lastTop: number;
    private speed: number;
    private radius: number;
    private angle = 0
    private px: Fx8;
    private py: Fx8;
    private cx = 80
    private cy = 60

    constructor(name: string, map: Image, radius: number, speed: number) {
        super(1);

        let left = 80
        let top = 60 - radius

        this.map = map;
        this.left = Fx8(left);
        this.top = Fx8(top);

        this.lastLeft = left;
        this.lastTop = top;

        this.vx = Fx8(0);
        this.vy = Fx8(0);
        this.speed = speed
        this.radius = radius

        this.left = Fx8(this.cx - 12 + (this.radius * Math.cos(this.angle * Math.PI / 180)));
        this.top = Fx8(this.cy - 4 + (this.radius * Math.sin(this.angle * Math.PI / 180)));
    }

    __drawCore(camera: scene.Camera) {
        screen.drawTransparentImage(
            this.map,
            Fx.toInt(this.left),
            Fx.toInt(this.top),
        );
    }

    Rotate() {
        this.angle += this.speed
        this.px = Fx8(this.cx - 12 + (this.radius * Math.cos(this.angle * Math.PI / 180)));
        this.py = Fx8(this.cy - 4 + (this.radius * Math.sin(this.angle * Math.PI / 180)));
        // Must call move and not modify left/top directly
        this.move(Fx.sub(this.px, this.left), Fx.sub(this.py, this.top));
    }

    move(dx: Fx8, dy: Fx8) {
        this.left = Fx.add(this.left, dx);
        this.top = Fx.add(this.top, dy);

        const dx2 = Fx.toInt(this.left) - this.lastLeft;
        const dy2 = Fx.toInt(this.top) - this.lastTop;

        if (dx2 || dy2) {
            this.lastLeft = Fx.toInt(this.left);
            this.lastTop = Fx.toInt(this.top);
        }
    }

    setVelocity(vx: number, vy: number) {
        this.vx = Fx8(vx);
        this.vy = Fx8(vy);
    }
}

let DayCount = 0
let textSprite = textsprite.create(DayCount + " Earth Days")
textSprite.setMaxFontHeight(8)
textSprite.setPosition(75, 10)

let Sun = new SpaceObject ("Sun",img`
    . 5 5 5 .
    5 5 5 5 5
    4 4 5 5 5
    5 5 5 4 4
    . 5 5 5 .
`,0,0)
let Mercury = new SpaceObject("Mercury", img`
    b
`, 4, 4.74)
let Venus = new SpaceObject("Venus", img`
    4 4
    4 4
`, 6, 3.5)
let Earth = new SpaceObject("Earth", img`
    . 9 .
    9 7 7
    . 7 .
`, 10, 2.98)
let Mars = new SpaceObject("Mars", img`
    . 2 .
    4 2 2
    . 2 .
`, 13, 2.41)
let Jupiter = new SpaceObject("Jupiter", img`
    . 4 4 5 .
    d 4 4 4 4
    2 2 4 d d
    5 4 4 4 4
    . 4 4 2 .
`, 26, 1.31)
let Saturn = new SpaceObject("Saturn", img`
    . . . 4 4 4 . . .
    . . 4 4 4 4 4 . .
    d d d d d d d d d
    . . 4 4 4 4 4 . .
    . . . 4 4 4 . . .
`, 34, 0.97)
let Uranus = new SpaceObject("Uranus", img`
    . 9 9 .
    8 8 9 9
    9 9 9 9
    . 9 8 .
`, 49, 0.68)
let Neptune = new SpaceObject("Neptune", img`
    . c c .
    a c c c
    c c c a
    . c a .
`, 60, 0.54)
let Planets = [Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune]
game.onUpdate(function () {
    Planets.forEach(function (value: SpaceObject, index: number) {
        value.Rotate()        
    })

    DayCount = DayCount + 3
    textSprite.setText(DayCount + " Earth Days")
})
game.onUpdateInterval(1000, function () {
    WhiteStar = sprites.createProjectileFromSide(img`
        1
    `, Math.randomRange(-1, -10), 0)
    WhiteStar.setPosition(160, Math.randomRange(0, 120))
    WhiteStar.setFlag(SpriteFlag.Ghost, true)
    WhiteStarL = sprites.createProjectileFromSide(img`
        1
    `, Math.randomRange(1, 10), 0)
    WhiteStarL.setPosition(0, Math.randomRange(0, 120))
    WhiteStarL.setFlag(SpriteFlag.Ghost, true)
})
