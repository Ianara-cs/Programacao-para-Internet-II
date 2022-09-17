import { container } from "tsyringe";
import { IEmailCodeRepository } from "../../modules/auth/repositories/IEmailCodeRepository";
import { EmailCodeRepository } from "../../modules/auth/repositories/implementations/EmailCodeRepository";
import { PhoneCodeRepository } from "../../modules/auth/repositories/implementations/PhoneCodeRepository";
import { UsersRepository } from "../../modules/auth/repositories/implementations/UsersRepository";
import { IPhoneCodeRepository } from "../../modules/auth/repositories/IPhoneCodeRepository";
import { IUsersRepository } from "../../modules/auth/repositories/IUsersRepository";
import { ReadingRepository } from "../../modules/reading/repositories/implementations/ReadingRepository";
import { IReadingRepository } from "../../modules/reading/repositories/IReadingRepository";

container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IEmailCodeRepository> (
    "EmailCodeRepository",
    EmailCodeRepository
)

container.registerSingleton<IPhoneCodeRepository> (
    "PhoneCodeRepository",
    PhoneCodeRepository
)

container.registerSingleton<IReadingRepository> (
    "ReadingRepository",
    ReadingRepository
)

