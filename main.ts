let angle = 0
class Platform extends sprites.BaseSprite {
    public map: Image;
    public left: Fx8;
    public top: Fx8;
    public vx: Fx8;
    public vy: Fx8;
    protected riders: Sprite[];
    protected lastLeft: number;
    protected lastTop: number;

    constructor(map: Image, left: number, top: number) {
        super(1);

        this.map = map;
        this.left = Fx8(left);
        this.top = Fx8(top);

        this.lastLeft = left;
        this.lastTop = top;

        this.vx = Fx8(0);
        this.vy = Fx8(0);

        this.riders = [];
    }

    __drawCore(camera: scene.Camera) {
        screen.drawTransparentImage(
            this.map,
            Fx.toInt(this.left),
            Fx.toInt(this.top),
        );
    }

    addRider(rider: Sprite) {
        if (this.riders.indexOf(rider) === -1)
            this.riders.push(rider);
    }

    move(dx: Fx8, dy: Fx8) {
        this.left = Fx.add(this.left, dx);
        this.top = Fx.add(this.top, dy);

        const dx2 = Fx.toInt(this.left) - this.lastLeft;
        const dy2 = Fx.toInt(this.top) - this.lastTop;

        if (dx2 || dy2) {
            this.lastLeft = Fx.toInt(this.left);
            this.lastTop = Fx.toInt(this.top);

            if (this.riders.length) {
                for (const r of this.riders) {
                    if (dx2) r._x = Fx8(r.left + dx2);
                    if (dy2) r._y = Fx8(r.top + dy2)
                }
            }
        }
    }

    setVelocity(vx: number, vy: number) {
        this.vx = Fx8(vx);
        this.vy = Fx8(vy);
    }
}
const p = new Platform(img`
    . 9 9 7 .
    9 9 9 7 7
    9 7 9 9 7
    9 9 9 9 9
    . 9 9 9 .
`, 0, 0);
let px: Fx8;
let py: Fx8;
let radius = 50
let cx = 80
let cy = 60
p.left = Fx8(cx - 12 + (radius * Math.cos(angle * Math.PI / 180)));
p.top = Fx8(cy - 4 + (radius * Math.sin(angle * Math.PI / 180)));
let mySprite = sprites.create(img`
. 5 5 5 . 
5 5 5 5 5 
4 4 5 5 5 
5 5 5 4 4 
. 5 5 5 . 
`, 0)
animation.runImageAnimation(
mySprite,
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
game.onUpdate(function () {
    angle += 0.5
    px = Fx8(cx - 12 + (radius * Math.cos(angle * Math.PI / 180)));
py = Fx8(cy - 4 + (radius * Math.sin(angle * Math.PI / 180)));
// Must call move and not modify left/top directly
    p.move(Fx.sub(px, p.left), Fx.sub(py, p.top));
})
