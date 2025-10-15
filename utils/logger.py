import logging
from datetime import datetime
from logging.handlers import TimedRotatingFileHandler
from pathlib import Path


def get_logger(logger_name: str = "WildAssistant") -> logging.Logger:
    """获得单例logger WildAssistant

    Returns:
        Logger: 单例logger
    """
    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.DEBUG)

    # file log handler
    file_handler = TimedRotatingFileHandler(
        # filename=f"{datetime.now().strftime(" % Y - % m - %d")}.log"
        filename=Path("logs") / f"{datetime.now().strftime("%Y-%m-%d")}.log",
        when="midnight",
        backupCount=90,
        encoding="utf-8",
    )
    file_handler.setLevel(logging.INFO)

    # console log handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    file_formatter = logging.Formatter(
        fmt="%(asctime)s - %(name)s - %(filename)10s - %(lineno)4d - %(funcName)10s - %(levelname)8s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    console_formatter = logging.Formatter(
        fmt="%(asctime)s - %(levelname)8s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
    )

    file_handler.setFormatter(file_formatter)
    console_handler.setFormatter(console_formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger


def check_and_create_log_dir():
    log_dir = Path("logs")
    if not log_dir.exists():
        log_dir.mkdir(parents=True)
        print(f"Created log directory at {log_dir.resolve()}")
    else:
        print(f"Log directory already exists at {log_dir.resolve()}")
