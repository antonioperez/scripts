

"""
Antonio D Perez
THE GAME OF LIFE
ID: 106333169

INSTALL LATEST PYGAME! 
http://www.pygame.org/download.shtml

Hello y'all. Ready to play the game of life. The popplers need eyes.


"""
import pygame, sys
import string
from random import choice, randint, randrange, uniform, random
from vec2d import vec2d
 
BLACK  = (   0,   0,   0)
WHITE  = ( 255, 255, 255)
BLUE   = (   0,   0, 255)
GREEN  = (   0, 255,   0)
RED    = ( 255,   0,   0)
PURPLE = ( 255,   0, 255)
OPTIMAL_DNA = "KILL"




 
class Wall(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, color):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.Surface([width, height])
        self.image.fill(color)
        self.rect = self.image.get_rect()
        self.rect.y = y
        self.rect.x = x
        self.wall_list = None

class World(object):
    def __init__(self):
        self.wall_list = pygame.sprite.Group()
        self.food_list = pygame.sprite.Group()

    def food(self):
        """Make the walls. (x_pos, y_pos, width, height)"""
        walls = []
        starting_food = randint(150, 300)
        for i in xrange(0, starting_food):
            x_pos = randint(15, 800)
            y_pos = randint(15, 800)
            walls.append([x_pos, y_pos, 3, 3, BLACK])
                 
        for item in walls:
            wall = Wall(item[0], item[1], item[2], item[3], item[4])
            self.food_list.add(wall)
        return self.food_list

    def world1(self):
        walls = [[0, 0, 20, 800, BLUE],
                 [780, 0, 20, 800, BLUE],
                 [20, 0, 800, 20, BLUE],
                 [20, 580, 800, 20, BLUE],
                 [390, 50, 20, 200, BLUE],
                 [390, 400, 20, 100, BLUE]]

        for item in walls:
            wall = Wall(item[0], item[1], item[2], item[3], item[4])
            self.wall_list.add(wall)
        return self.wall_list
 
class Poppler(pygame.sprite.Sprite):
    def __init__(self, x, y, init_direction, color = None, size = None, dna = None, age = 0):
        pygame.sprite.Sprite.__init__(self)
        self.size = randrange(4,15), randrange(4,15)
        self.color = (randint ( 0, 255 ), randint ( 0, 255 ), randint ( 0, 255 ))
        self.dna = ''.join(choice(string.ascii_uppercase) for _ in range(4))
        if size:
            self.size = size
        if color:
            self.color = color
        if dna:
            self.dna = dna

        self.stamina = randrange(500,1650)
        self.age = age
        self.life_span = randrange(1000,2500)
        self.speed = uniform(.001, .6)
        self.ori_speed = self.speed
        self.eating = 10
        self.dna_score = self.fitness(self.dna)
        

        self.birth_recup = 20
        self.counter = 0
        self.image = pygame.Surface([self.size[0], self.size[1]])
        self.image.fill(self.color)
        self.rect = self.image.get_rect()
        self.rect.x, self.rect.y = vec2d((x,y))
        self.direction = vec2d(init_direction).normalized()

    def isFertile(self):
        """Only fertile if old enough"""
        if self.age > int(self.life_span/4):
            return True
        return False

    def astar(self):
        pass

    def bfs(self):
        pass

    def splice_dna(self, partner_dna):
        "switch genes in dna"
        pos = int(random()*len(self.dna))
        return (self.dna[:pos]+partner_dna[pos:], partner_dna[:pos]+self.dna[pos:])

    def mutate_gene(self, gene1, gene2):
        "mutate other genes not accredited by string dna"
        gene_avg = (gene1+ gene2) / 2
        mutation_factor = uniform(-1,1.5)
        gene_avg += (gene_avg / 2) * mutation_factor
        return int(round(gene_avg))

    def mutate_dna(self, dna):
        dna_out = ""
        mutation_chance = 50
        for c in xrange(len(dna)):
            if int(random()*mutation_chance) == 1:
                dna_out += choice(string.ascii_uppercase)
            else:
                dna_out += dna[c]
        return dna_out

    def fitness(self, dna):
        """
        the difference between self dna and optimal dna. This is the attraction level. A lower number the better.
        """
        score = 0
        for c in xrange(len(dna)):
            score += abs(ord(dna[c]) - ord(OPTIMAL_DNA[c]))
        return score

    def mate(self, partner):
        "Time to play god."
        attraction = abs(self.dna_score - partner.dna_score)
        if self.isFertile() and partner.isFertile() and self.birth_recup < 0 and attraction < 5:
            print "It's ALIVE!", attraction
            pos = self.rect.left + self.rect.width, partner.rect.top
            par_size1 = self.size
            par_size2 = partner.size
            #red, green, blue
            r1, g1, b1 = self.color
            r2, g2, b2  = partner.color

            size = (self.mutate_gene(par_size1[0],par_size2[0])/2, self.mutate_gene(par_size1[1],par_size2[1])/2)
            child_red = self.mutate_gene( r1, r2 )
            child_green = self.mutate_gene( g1, g2 )
            child_blue = self.mutate_gene( b1, b2 )   

            #Keep colors within limit 
            if child_red > 255:
                child_red = 255
            elif child_red < 0:
                child_red = 0
            if child_blue > 255:
                child_blue = 255
            elif child_blue < 0:
                child_blue = 0
            if child_green > 255:
                child_green = 255
            elif child_green < 0:
                child_green = 0

            color = (child_red, child_green, child_blue)
            self.birth_recup = 20
            partner.birth_recup = 20

            self.stamina -= 25
            partner.stamina -= 25
            dna1, dna2 = self.splice_dna(partner.dna)
            dna1, dna2 = self.mutate_dna(dna1), self.mutate_dna(dna2)
            dna_score1, dna_score2 = self.fitness(dna1), self.fitness(dna2)
            if dna_score1 > dna_score2:
                dna = dna2
                dna_score = dna_score2
            else:
                dna = dna1
                dna_score = dna_score1
            print dna, dna_score

            child = Poppler(pos[0], pos[1], self.direction, color, size, dna)
            child.life_span = self.mutate_gene( self.life_span, partner.life_span )
            return child
        return False

    def update(self, time_passed, walls = None, food = None, poppies = None):
        "update organism every frame"
        self.counter += time_passed
        self.age += 1
        self.stamina -= 1

        if self.counter > randint(100, 200):
            self.direction.rotate(45 * randint(-1, 1))
            self.birth_recup  -= 1
            self.counter = 0
            y = self.size[1] + .07
            x = self.size[0] + .07

            self.size = x,y
            self.image = pygame.Surface([self.size[0], self.size[1]])
            self.image.fill(self.color)

        displacement = vec2d(    
                    self.direction.x * self.speed * time_passed,
                    self.direction.y * self.speed * time_passed)

        if self.stamina < 0 or self.age > self.life_span:
            displacement = 0,0
            self.image.fill(BLACK)

        self.change_x, self.change_y = displacement
        self.rect.x += self.change_x

        wall_hit = pygame.sprite.spritecollide(self, walls, False)
        for block in wall_hit:
            if self.change_x > 0:
                self.rect.right = block.rect.left
            else:
                self.rect.left = block.rect.right
        self.rect.y += self.change_y

        wall_hit = pygame.sprite.spritecollide(self, walls, False)
        for block in wall_hit:
            if self.change_y > 0:
                self.rect.bottom = block.rect.top
            else:
                self.rect.top = block.rect.bottom

        food_hit_list = pygame.sprite.spritecollide(self, food, False)
        for block in food_hit_list:
            self.stamina += 50
            block.kill()

def run_game():
    SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600
    BG_COLOR = 245, 245, 245
    N_POP = 30

    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT), 0, 32)
    clock = pygame.time.Clock()
 
    Universe = World()
    map = Universe.world1()
    food = Universe.food()
    movingsprites = pygame.sprite.Group()
    poppies = pygame.sprite.Group()
    for i in range(N_POP):
        poppies.add(Poppler(randrange(700), randrange(550), (choice([-1, 1]), choice([-1, 1]))))

    timer = 0
    while True:
        time_passed = clock.tick()
        timer += time_passed

        if timer > 30000:
            print "Population size %s" % len(poppies)
            food.add(Universe.food())
            timer = 0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit_game()
        
        for poppler in poppies:
            poppler.update(time_passed, map, food, poppies)
            copy = poppies.copy()
            copy.remove(poppler)
            poppies_collided = pygame.sprite.spritecollide(poppler, copy, False)
            if poppies_collided:
                for block in poppies_collided:
                    baby = poppler.mate(block)
                    if baby:
                        poppies.add(baby)
                    elif poppler.dna_score < 10 and (poppler.dna_score > block.dna_score):
                        block.kill()
                        print 'kill'
                        poppler.stamina += 100

                    block.direction.rotate(45 * randint(-1, 1))
                    poppler.direction.rotate(45 * randint(-1, 1))

            if poppler.stamina < 0 and poppler not in food:
                poppies.remove(poppler)
                food.add(poppler)


        screen.fill(WHITE)
        movingsprites.draw(screen)
        poppies.draw(screen)
        map.draw(screen)
        food.draw(screen)
        pygame.display.flip()

def exit_game():
    sys.exit()
run_game()

