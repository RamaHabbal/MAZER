class Menu extends Phaser.Scene {
  
    create() {
      const resumeButton = this.add.text(200, 200, 'Resume', { fontSize: '32px', fill: '#fff' });
      resumeButton.setInteractive().on('pointerup', () => {
        this.scene.stop("Menu");
        this.scene.resume("Scene3");
      });
    }
}
  