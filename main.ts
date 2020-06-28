let angle = 0
class Planet extends sprites.BaseSprite {
    public map: Image;
    public left: Fx8;
    public top: Fx8;
    public vx: Fx8;
    public vy: Fx8;
    protected lastLeft: number;
    protected lastTop: number;
    private speed: number;

    constructor(map: Image, radius: number, speed: number) {
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
    }

    __drawCore(camera: scene.Camera) {
        screen.drawTransparentImage(
            this.map,
            Fx.toInt(this.left),
            Fx.toInt(this.top),
        );
    }

    Rotate() {
        angle += this.speed
        px = Fx8(cx - 12 + (radius * Math.cos(angle * Math.PI / 180)));
        py = Fx8(cy - 4 + (radius * Math.sin(angle * Math.PI / 180)));
        // Must call move and not modify left/top directly
        this.move(Fx.sub(px, this.left), Fx.sub(py, this.top));
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
const earth = new Planet(img`
    . 9 9 7 .
    9 9 9 7 7
    9 7 9 9 7
    9 9 9 9 9
    . 9 9 9 .
`, 0, 2);
let px: Fx8;
let py: Fx8;
let radius = 50
let cx = 80
let cy = 60
earth.left = Fx8(cx - 12 + (radius * Math.cos(angle * Math.PI / 180)));
earth.top = Fx8(cy - 4 + (radius * Math.sin(angle * Math.PI / 180)));
let mySprite = sprites.create(img`
    . 5 5 5 .
    5 5 5 5 5
    4 4 5 5 5
    5 5 5 4 4
    . 5 5 5 .
`, 0)

game.onUpdate(function(){
    earth.Rotate()
})

animation.runImageAnimation(
    mySprite,
    [img`
    . 4 5 5 .
    5 5 5 5 5
    5 5 5 5 5
    5 5 5 4 5
    . 5 5 4 .
`, img`
    . 4 5 5 .
    5 4 5 5 5
    5 5 5 5 5
    5 5 5 5 5
    . 5 5 4 .
`],
    100,
    true
)