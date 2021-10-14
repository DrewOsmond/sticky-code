"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Note_1 = require("./Note");
let Collection = class Collection {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Collection.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.collections, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Collection.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Note_1.Note, (note) => note.collection),
    __metadata("design:type", Note_1.Note)
], Collection.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "text" }),
    __metadata("design:type", String)
], Collection.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "boolean" }),
    __metadata("design:type", Boolean)
], Collection.prototype, "personal", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Note_1.Note),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Collection.prototype, "added_notes", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Collection.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Collection.prototype, "updated_at", void 0);
Collection = __decorate([
    typeorm_1.Entity("collections")
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map