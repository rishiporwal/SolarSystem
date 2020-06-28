class Planet extends sprites.BaseSprite {
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

let sun = sprites.create(img`
    . 5 5 5 .
    5 5 5 5 5
    4 4 5 5 5
    5 5 5 4 4
    . 5 5 5 .
`, 0)
sun.setPosition(70, 57)
animation.runImageAnimation(
    sun,
    [img`
        . 4 5 5 .
        5 5 5 5 5
        5 5 5 5 5
        5 5 5 4 5
        . 5 5 4 .
    `,img`
        . 4 5 5 .
        5 4 5 5 5
        5 5 5 5 5
        5 5 5 5 5
        . 5 5 4 .
    `],
    100,
    true
)

let planets = [new Planet("Earth", img`
    . 9 9 7 .
    9 9 9 7 7
    9 7 9 9 7
    9 9 9 9 9
    . 9 9 9 .
`, 30, 2.98), new Planet("Mercury", img`
    . b b b .
    d b b b b
    b b b b b
    b b b b d
    . b b b .
`, 10, 4.74), new Planet("Venus", img`
    . 4 4 4 .
    4 4 4 4 4
    4 4 4 4 4
    4 4 4 4 4
    . 4 4 4 .
`, 20, 3.5)];

game.onUpdate(function () {
    planets.forEach(function (value: Planet, index: number) {
        value.Rotate()        
    })
})

